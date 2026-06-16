import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта Целинные Луга на email менеджера."""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    order_type = body.get('orderType', 'retail')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    city = body.get('city', '').strip()
    company = body.get('company', '').strip()
    product = body.get('product', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    order_label = 'Оптовый покупатель' if order_type == 'wholesale' else 'Розничный покупатель'

    rows = [('Тип покупателя', order_label), ('Имя', name), ('Телефон', phone)]
    if city:
        rows.append(('Город', city))
    if company:
        rows.append(('Компания', company))
    if product:
        rows.append(('Продукт', product))
    if comment:
        rows.append(('Комментарий', comment))

    rows_html = ''.join(
        f'<tr><td style="padding:8px 12px;background:#f5ede0;font-weight:bold;width:160px;">{k}</td>'
        f'<td style="padding:8px 12px;border-bottom:1px solid #e0d0bb;">{v}</td></tr>'
        for k, v in rows
    )

    html_body = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#3d2408;font-family:Georgia,serif;border-bottom:2px solid #c8a96e;padding-bottom:12px;">
        Новая заявка — Целинные Луга
      </h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        {rows_html}
      </table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Письмо отправлено автоматически с сайта Целинные Луга</p>
    </div>
    """

    email_to = os.environ.get('EMAIL_TO', '')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — Целинные Луга'
    msg['From'] = 'noreply@poehali.dev'
    msg['To'] = email_to
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP('smtp.poehali.dev', 587) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.sendmail('noreply@poehali.dev', [email_to], msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True})
    }
