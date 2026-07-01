import json
import os
import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def json_response(data, status=200):
    return {'statusCode': status, 'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'}, 'body': json.dumps(data, ensure_ascii=False, default=str)}

def err(msg, status=400):
    return json_response({'error': msg}, status)

def check_auth(event):
    token = event.get('headers', {}).get('X-Auth-Token', '')
    return token == os.environ.get('CRM_TOKEN', '')

def handler(event: dict, context) -> dict:
    """CRM API: авторизация, лиды, клиенты. action передаётся через query ?action=..."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    qs = event.get('queryStringParameters') or {}
    action = qs.get('action', '')

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    # Авторизация
    if action == 'login':
        username = body.get('username', '')
        password = body.get('password', '')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id FROM crm_users WHERE username = %s AND password_hash = %s", (username, password))
        row = cur.fetchone()
        conn.close()
        if row:
            return json_response({'token': os.environ.get('CRM_TOKEN', '')})
        return err('Неверный логин или пароль', 401)

    if not check_auth(event):
        return err('Не авторизован', 401)

    conn = get_conn()
    cur = conn.cursor()
    try:
        # ЛИДЫ
        if action == 'leads' and method == 'GET':
            cur.execute("""
                SELECT l.id, l.product, l.comment, l.status, l.order_type, l.created_at, l.updated_at,
                       c.id as client_id, c.name, c.phone, c.email, c.company, c.city
                FROM leads l
                LEFT JOIN clients c ON l.client_id = c.id
                ORDER BY l.created_at DESC
            """)
            cols = [d[0] for d in cur.description]
            return json_response([dict(zip(cols, r)) for r in cur.fetchall()])

        if action == 'leads' and method == 'POST':
            name = body.get('name', '').strip()
            phone = body.get('phone', '').strip()
            if not name or not phone:
                return err('Имя и телефон обязательны')
            cur.execute("SELECT id FROM clients WHERE phone = %s", (phone,))
            client = cur.fetchone()
            if client:
                client_id = client[0]
                cur.execute("UPDATE clients SET name=%s, email=%s, company=%s, city=%s, updated_at=NOW() WHERE id=%s",
                            (name, body.get('email'), body.get('company'), body.get('city'), client_id))
            else:
                cur.execute("INSERT INTO clients (name, phone, email, company, city) VALUES (%s,%s,%s,%s,%s) RETURNING id",
                            (name, phone, body.get('email'), body.get('company'), body.get('city')))
                client_id = cur.fetchone()[0]
            cur.execute("INSERT INTO leads (client_id, product, comment, order_type) VALUES (%s,%s,%s,%s) RETURNING id",
                        (client_id, body.get('product'), body.get('comment'), body.get('order_type', 'retail')))
            lead_id = cur.fetchone()[0]
            conn.commit()
            return json_response({'id': lead_id, 'client_id': client_id})

        if action == 'update_lead' and method == 'POST':
            lead_id = body.get('id')
            status = body.get('status')
            comment = body.get('comment')
            product = body.get('product')
            sets, vals = [], []
            if status is not None:
                sets.append('status=%s'); vals.append(status)
            if comment is not None:
                sets.append('comment=%s'); vals.append(comment)
            if product is not None:
                sets.append('product=%s'); vals.append(product)
            if sets:
                sets.append('updated_at=NOW()')
                vals.append(lead_id)
                cur.execute(f"UPDATE leads SET {', '.join(sets)} WHERE id=%s", vals)
                conn.commit()
            return json_response({'ok': True})

        # КЛИЕНТЫ
        if action == 'clients' and method == 'GET':
            cur.execute("""
                SELECT c.*, COUNT(l.id) as leads_count
                FROM clients c
                LEFT JOIN leads l ON l.client_id = c.id
                GROUP BY c.id ORDER BY c.created_at DESC
            """)
            cols = [d[0] for d in cur.description]
            return json_response([dict(zip(cols, r)) for r in cur.fetchall()])

        if action == 'client' and method == 'GET':
            client_id = qs.get('id')
            cur.execute("SELECT * FROM clients WHERE id=%s", (client_id,))
            cols = [d[0] for d in cur.description]
            row = cur.fetchone()
            if not row:
                return err('Клиент не найден', 404)
            client = dict(zip(cols, row))
            cur.execute("SELECT * FROM leads WHERE client_id=%s ORDER BY created_at DESC", (client_id,))
            cols2 = [d[0] for d in cur.description]
            client['leads'] = [dict(zip(cols2, r)) for r in cur.fetchall()]
            return json_response(client)

        # СТАТИСТИКА
        if action == 'stats':
            cur.execute("SELECT COUNT(*) FROM leads")
            total = cur.fetchone()[0]
            cur.execute("SELECT status, COUNT(*) FROM leads GROUP BY status")
            by_status = {r[0]: r[1] for r in cur.fetchall()}
            cur.execute("SELECT COUNT(*) FROM clients")
            clients_count = cur.fetchone()[0]
            return json_response({'total_leads': total, 'by_status': by_status, 'clients_count': clients_count})

        return err('Неизвестный action', 404)
    finally:
        conn.close()
