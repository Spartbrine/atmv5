from . import sendmail_bp
from flask import current_app, jsonify

class EnviarCorreo:
    def __init__(self, app):
        self.app = app

def init_app(app):
    correo_rutas = EnviarCorreo(app)
