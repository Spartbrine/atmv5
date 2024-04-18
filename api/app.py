from flask import Flask
from flask_cors import CORS
from flask_mail import Mail, Message
from routes.cards_routes import cards_bp
from routes.creditCards_routes import creditCards_bp
from routes.debitCards_routes import debitCards_bp
from routes.partners_routes import partners_bp
from routes.partnersServices_routes import partnersServices_bp
from routes.partnersCredits_routes import partnersCredits_bp
from routes.transactions_routes import transactions_bp
from routes.services_routes import services_bp
from routes.generalQuery_routes import generalQuery_bp
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


app = Flask(__name__)
CORS(app)
app.register_blueprint(cards_bp)
app.register_blueprint(creditCards_bp)
app.register_blueprint(debitCards_bp)
app.register_blueprint(partners_bp)
app.register_blueprint(partnersServices_bp)
app.register_blueprint(partnersCredits_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(services_bp)
app.register_blueprint(generalQuery_bp)

app = Flask(__name__)
CORS(app)

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'tu_correo@example.com'
app.config['MAIL_PASSWORD'] = 'tu_contraseña'

# Inicialización de Flask-Mail
mail = Mail(app)

app.register_blueprint(cards_bp)
app.register_blueprint(creditCards_bp)
app.register_blueprint(debitCards_bp)
app.register_blueprint(partners_bp)
app.register_blueprint(partnersServices_bp)
app.register_blueprint(partnersCredits_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(services_bp)
app.register_blueprint(generalQuery_bp)

# def generar_pdf():
#     nombre_archivo = 'nota.pdf'
#     c = canvas.Canvas(nombre_archivo, pagesize=letter)
#     c.drawString(100, 750, "¡Hola!")
#     c.drawString(100, 730, "Esta es una nota generada con Python en formato PDF.")
#     c.drawString(100, 710, "Es un ejemplo simple de cómo crear un documento PDF.")
#     c.drawString(100, 690, "Saludos,")
#     c.drawString(100, 670, "Tu Nombre")
#     c.save()
#     return nombre_archivo

# def enviar_correo(destinatario, asunto, cuerpo, adjunto=None):
#     msg = Message(asunto, sender='tu_correo@example.com', recipients=[destinatario])
#     msg.body = cuerpo
#     if adjunto:
#         with app.open_resource(adjunto) as adjunto_pdf:
#             msg.attach(adjunto, 'application/pdf', adjunto_pdf.read())
#     mail.send(msg)

# @app.route('/enviar-correo')
# def enviar_correo_electronico():
#     destinatario = 'destinatario@example.com'
#     asunto = '¡Nota generada!'
#     cuerpo = 'Adjunto encontrarás la nota generada.'
#     adjunto_pdf = generar_pdf()
#     enviar_correo(destinatario, asunto, cuerpo, adjunto_pdf)
#     return 'Correo electrónico enviado correctamente.'

if __name__ == '__main__':
    app.run(debug=True)