#backend/api/tareas.py
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.Tarea import Tarea
from models import db

tareas_bp = Blueprint('/tareas', __name__)

@tareas_bp.route('', methods=['POST'])
@jwt_required()
def crear_tarea():
    data = request.get_json()
    nueva_tarea = Tarea(
        titulo=data['titulo'],
        prioridad=data['prioridad'], 
        descripcion=data.get('descripcion', ''),
        usuario_id = int(get_jwt_identity())
    )
    db.session.add(nueva_tarea)
    db.session.commit()
    return jsonify(nueva_tarea.to_dict()), 201

@tareas_bp.route('', methods=['GET'])
@jwt_required()
def obtener_tareas():
    tareas = Tarea.query.filter_by(usuario_id=int(get_jwt_identity())).all()
    return jsonify([t.to_dict() for t in tareas])

@tareas_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def obtener_tarea(id):
    tarea = Tarea.query.filter_by(id=id, usuario_id=int(get_jwt_identity())).first_or_404()
    return jsonify(tarea.to_dict())

@tareas_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_tarea(id):
    tarea = Tarea.query.filter_by(id=id, usuario_id=int(get_jwt_identity())).first_or_404()
    data = request.get_json()

    tarea.titulo = data.get('titulo', tarea.titulo)
    tarea.descripcion = data.get('descripcion', tarea.descripcion)
    tarea.completada = data.get('completada', tarea.completada)
    tarea.prioridad = data.get('prioridad', tarea.prioridad)

    db.session.commit()
    return jsonify(tarea.to_dict())

@tareas_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_tarea(id):
    tarea = Tarea.query.filter_by(id=id, usuario_id=int(get_jwt_identity())).first_or_404()
    db.session.delete(tarea)
    db.session.commit()
    return jsonify({"mensaje": "Tarea eliminada"}), 204
