from flask_jwt_extended import JWTManager

from src import app, db
from src.controllers.auth import auth
from src.controllers.user_management import user_management
from src.models.revoked_token_model import is_jti_blacklisted

# Import routes
app.register_blueprint(auth)
app.register_blueprint(user_management)

# Setup Flask-JWT-Extended
jwt = JWTManager(app)

# Create database tables
db.create_all()


@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return is_jti_blacklisted(jti)


@app.route('/')
def api():
    return 'API is running on ' + str(app.config['SERVER_NAME'])


if __name__ == '__main__':
    app.run()
