from flask import Blueprint

api_bp = Blueprint('api', __name__, url_prefix='/api')

from . import tareas  # Importa las rutas de tareas
