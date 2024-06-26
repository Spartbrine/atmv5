from flask import jsonify, request
from . import transactions_bp
from data.conection import conectar_bd
from data.conection import verTodosDatos
from data.conection import insertarDatos3Columnas
from data.conection import verDato
from data.conection import ContarDato
from data.conection import verYordenarTransacciones
from datetime import date
tabla = 'transactions'
#Obtener todas las transacciones
@transactions_bp.route('/transacciones', methods=['GET'])
def obtener_transacciones():
    conexion = conectar_bd()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM transactions')
    transacciones = verTodosDatos(cursor, tabla)   
    conexion.close()
    return transacciones

#Obtener las transacciones de un usuario
@transactions_bp.route('/transacciones/<int:id_user>', methods=['GET'])
def obtener_transacciones_id(id_user):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    transacciones = verDato(cursor, tabla,'id_user', id_user)
    conexion.close()
    if transacciones:
        return jsonify(transacciones)
    else:
        return jsonify({"mensaje": "Transaccion no encontrada"}), 404


#Contador para las transacciones
@transactions_bp.route('/transacciones/fecha/<int:id_user>', methods=['GET'])
def contar_transacciones_usuario(id_user):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    transacciones = ContarDato(cursor, id_user)
    conexion.close()
    if transacciones:
        return jsonify(transacciones)
    else:
        return jsonify({"mensaje": "Transaccion no encontrada"}), 404

#Publicar transacciones 
@transactions_bp.route('/transacciones', methods=['POST'])
def generar_transaccion():
    data = request.json  
    id_usuario = data.get('id_user')
    tipo = data.get('typeTransaction')

    conexion = conectar_bd()

    cursor = conexion.cursor()

    if insertarDatos3Columnas(cursor, tabla, 'id_user', 'dateTransaction', 'typeTransaction', id_usuario, date.today(), tipo) == True:
        mensaje = "Los datos fueron insertados correctamente."
        status_code = 200
    else:
        mensaje = "Error: No se pudieron insertar los datos."
        status_code = 500
        
    conexion.close()

    return jsonify({'mensaje': mensaje}), status_code


 #Para ver las transacciones con condicion, se me ocurrio hasta despues por lo que quedaron aca jeje
@transactions_bp.route('/transacciones/asc/<int:id_user>', methods=['GET'])
def obtener_transacciones_asc(id_user):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    transacciones = verYordenarTransacciones(cursor, tabla, 'id_user', id_user, 'ASC')
    conexion.close()
    if transacciones:
        return jsonify(transacciones)
    else:
        return jsonify({"mensaje": "Transaccion no encontrada"}), 404

@transactions_bp.route('/transacciones/desc/<int:id_user>', methods=['GET'])
def obtener_transacciones_desc(id_user):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    transacciones = verYordenarTransacciones(cursor, tabla, 'id_user', id_user, 'DESC')
    conexion.close()
    if transacciones:
        return jsonify(transacciones)
    else:
        return jsonify({"mensaje": "Transaccion no encontrada"}), 404
