from . import cards_bp
from flask import jsonify, request
from data.conection import conectar_bd
from data.conection import verTodosDatos
from data.conection import insertarDatos5Columnas
from data.conection import verDato
from data.conection import actualizarDatos
from datetime import date
tabla = 'cards'

#Visualizar
@cards_bp.route('/tarjetas', methods=['GET'])
def obtener_tarjetas():
    conexion = conectar_bd()
    cursor = conexion.cursor()
    tarjetas=verTodosDatos(cursor, tabla)
    conexion.close()
    return tarjetas


@cards_bp.route('/tarjetas/<int:tarjeta>', methods=['GET'])
def obtener_tarjeta(tarjeta):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    tarjeta = verDato(cursor, tabla, 'card',tarjeta)
    conexion.close()
    return tarjeta

#Para obtenerlo por id de usuario
@cards_bp.route('/tarjetasuser/<int:id_user>', methods=['GET'])
def obtener_tarjeta_usuario(id_user):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    tarjeta = verDato(cursor, tabla, 'id_user',id_user)
    conexion.close()
    return tarjeta


#Insertar 
@cards_bp.route('/tarjetas', methods=['POST'])
def registrar_tarjeta():
    datos = request.json
    nip = datos.get('nip')
    card = datos.get('card')
    creation_date = date.today()
    cvv = datos.get('cvv')
    id_user = datos.get('id_user')
    conexion = conectar_bd()
    cursor = conexion.cursor()
    e = insertarDatos5Columnas(cursor, tabla, 'nip', 'card', 'creation_date', 'cvv','id_user', nip, card, creation_date , cvv , id_user)
    if  e == True:
        mensaje = "Los datos fueron insertados correctamente."
        status_code = 200
    else:
        
        mensaje = "Error: No se pudieron insertar los datos." 
        status_code = 500
    conexion.close()

    return jsonify({'mensaje': mensaje}), status_code

#Actualizar
@cards_bp.route('/tarjetas', methods=['PUT'])
def actualizar_socio():
    data = request.json
    card = data.get('card')
    creation_date = data.get('creation_date')
    nip = data.get('nip')
    conexion = conectar_bd()

    cursor = conexion.cursor()

    if card:
        if creation_date:
            creation_date=date.today()
            e1 = actualizarDatos(cursor, tabla,'creation_date', creation_date, 'card', card)
            if  e1 == True:
                mensaje = "Los datos fueron actualizados correctamente."
                status_code = 200
            else:
                mensaje = "Error: No se pudieron actualizar los datos." 
                status_code = 500
        if nip:
            e1 = actualizarDatos(cursor, tabla,'nip', nip, 'card', card)
            if  e1 == True:
                mensaje = "Los datos fueron actualizados correctamente."
                status_code = 200
            else:
                mensaje = "Error: No se pudieron actualizar los datos." 
                status_code = 500
    conexion.close()

    return jsonify({'mensaje': mensaje}), status_code