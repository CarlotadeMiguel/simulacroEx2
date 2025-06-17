from flask import request, jsonify, Blueprint
from models.Usuario import Usuario
from models import db
from flask_jwt_extended import create_access_token


auth_bp = Blueprint('/auth', __name__)

@auth_bp.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email ya registrado"}), 409

    nuevo_usuario = Usuario(email=data['email'])
    nuevo_usuario.set_password(data['password'])
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"mensaje": "Usuario creado"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data['email']).first()

    if not usuario or not usuario.check_password(data['password']):
        return jsonify({"error": "Credenciales inválidas"}), 401

    access_token = usuario.generate_token()
    return jsonify(access_token=access_token), 200
