from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database

# Setup Flask app
app = Flask(__name__)
CORS(app)
app.config.from_json('../config.json', 'config.json')
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

# Initialise database
db_url = app.config['SQLALCHEMY_DATABASE_URI']

if not database_exists(db_url):
    create_database(db_url)

db = SQLAlchemy(app)
