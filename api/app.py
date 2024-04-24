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

# Configuración de Flask-Mail
# Configuración de Flask-Mail para Outlook
app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME']='starbanfalsenk@hotmail.com'
app.config['MAIL_PASSWORD']='AtmStarBank12'

# Inicialización de Flask-Mail
mail = Mail(app)

def enviar_correo(destinatario, asunto, cuerpo):
    msg = Message(asunto, sender='starbanfalsenk@hotmail.com', recipients=[destinatario])
    msg.body = cuerpo
    mail.send(msg)

@app.route('/enviar-correo')
def enviar_correo_electronico():
    destinatario = 'tutoruialsspartan@gmail.com'
    asunto = 'STAR BANK ATM'
    cuerpo = 'Se ha realizado una transacción en tu banco.'
    enviar_correo(destinatario, asunto, cuerpo)
    return 'Correo electrónico enviado correctamente.'

if __name__ == '__main__':
    app.run(debug=True)
