#backend/app.py

from flask import Flask
from config.settings import get_config
from models.Tarea import db
from flask_migrate import Migrate
from api.auth import auth_bp
from api.tareas import tareas_bp
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager

load_dotenv()

app = Flask(__name__)
app.config.from_object(get_config())

jwt = JWTManager(app)
CORS(app, origins=app.config.get('CORS_ORIGINS', '*'))

db.init_app(app)
migrate = Migrate(app, db)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(tareas_bp, url_prefix='/api/tareas')

if __name__ == '__main__':
    app.run(debug=True)
