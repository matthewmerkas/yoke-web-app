from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

from src.models.auth import authenticate, get_password, get_username
from src.models.revoked_token_model import RevokedTokenModel

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    try:
        username = get_username(request)
        password = get_password(request)
    except ValueError as error:
        return jsonify({'message': str(error)}), 400

    try:
        user = authenticate(username, password)
    except ValueError as error:
        return jsonify({'message': str(error)}), 401

    access_token = create_access_token(identity={'id': user.id, 'username': username})
    return jsonify(access_token=access_token), 200


@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    try:
        RevokedTokenModel(jti=jti)
        return {'message': 'Access token has been revoked'}
    except:
        return {'message': 'Something went wrong'}, 500


@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    username = get_jwt_identity()['username']
    return jsonify(username=username, data="This is a secret string"), 200
