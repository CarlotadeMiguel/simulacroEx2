#backend/api/tareas.py
from flask import request, jsonify
from . import api_bp
from models.Tarea import db, Task

@api_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'id': t.id, 'title': t.title, 'priority': t.priority} for t in tasks])

@api_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(title=data['title'], priority=data['priority'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'title': new_task.title, 'priority': new_task.priority}), 201
