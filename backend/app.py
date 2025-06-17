#backend/app.py

from flask import Flask
from config.settings import get_config
from models.Tarea import db
from flask_migrate import Migrate
from api import api_bp
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config.from_object(get_config())

CORS(app, origins=app.config.get('CORS_ORIGINS', '*'))

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
