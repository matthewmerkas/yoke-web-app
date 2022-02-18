from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from src.models.auth import get_password, get_username
from src.models.user_management import useradd, userdel

user_management = Blueprint('user_management', __name__)


@user_management.route('/create_account', methods=['POST'])
def create_account():
    try:
        username = get_username(request)
        password = get_password(request)
    except ValueError as error:
        return jsonify({'message': str(error)}), 400

    try:
        useradd(username, password)
    except ValueError as error:
        return jsonify({'message': str(error)}), 401

    return jsonify({'message': 'Account created successfully'}), 200


@user_management.route('/delete_account', methods=['POST'])
@jwt_required()
def delete_account():
    username = get_jwt_identity()['username']
    password = get_password(request)
    try:
        userdel(username, password)
    except ValueError as error:
        return jsonify({'message': str(error)}), 401

    return jsonify({'message': 'Account deleted successfully'}), 200
