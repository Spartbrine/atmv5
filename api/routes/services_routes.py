from . import services_bp
from data.conection import conectar_bd
from data.conection import verTodosDatos
from data.conection import verDato
from flask import jsonify

tabla = 'services'

@services_bp.route('/servicios', methods=['GET'])
def obtener_servicios():
    conexion = conectar_bd()
    cursor = conexion.cursor()
    servicios = verTodosDatos(cursor, tabla)
    conexion.close()

    return servicios
    
@services_bp.route('/servicios/<int:id>', methods=['GET'])
def obtener_servicio(id):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    servicio = verDato(cursor, tabla, 'id', id)

    conexion.close()

    return jsonify(servicio)