from . import generalQuery_bp
from flask import jsonify, request
from data.conection import conectar_bd


@generalQuery_bp.route('/consulta/<int:id>', methods=['GET'])
def obtener_datos_generales(id):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    query = """
        SELECT DISTINCT partners.*, cards.*, partnersCredits.*, partnersServices.*, transactions.*
        FROM partners
        LEFT JOIN cards ON partners.id = cards.id_user
        LEFT JOIN partnersCredits ON partners.id = partnersCredits.id_user
        LEFT JOIN partnersServices ON partners.id = partnersServices.id_user
        LEFT JOIN transactions ON partners.id = transactions.id_user
        WHERE partners.id = ?
        """
    cursor.execute(query, (id,))
    datosObtenidos = cursor.fetchall()

    return jsonify({'datos':datosObtenidos})