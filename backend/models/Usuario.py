#backend/models/Usuario.py
from models import db
from flask_jwt_extended import create_access_token
from datetime import timedelta
import bcrypt

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    tareas = db.relationship('Tarea', backref='usuario', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def generate_token(self):
        return create_access_token(identity=str(self.id), expires_delta=timedelta(hours=2))
