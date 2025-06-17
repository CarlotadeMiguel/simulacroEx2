# backend/models/Tarea.py
from models import db

class Tarea(db.Model):
    __tablename__ = 'tareas'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(120), nullable=False)
    prioridad = db.Column(db.String(20), nullable=False)  # NUEVO CAMPO
    descripcion = db.Column(db.Text)
    completada = db.Column(db.Boolean, default=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'prioridad': self.prioridad,
            'descripcion': self.descripcion,
            'completada': self.completada,
            'usuario_id': self.usuario_id
        }
