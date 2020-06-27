from Crypto.Hash import SHA256

from src.models.user_model import UserModel


def get_username(request):
    if not request.is_json:
        raise ValueError('Missing JSON in request')

    username = request.json.get('username', None)
    if not username:
        raise ValueError("Missing 'username' parameter")

    return username


def get_password(request):
    if not request.is_json:
        raise ValueError('Missing JSON in request')

    password = request.json.get('password', None)
    if not password:
        raise ValueError("Missing 'password' parameter")

    return password


def authenticate(username, password):
    user = UserModel.query.filter_by(username=username).first()
    if user and password:
        password = SHA256.new(password.encode() + user.salt.encode()).hexdigest()
        if password == user.password:
            return user
    raise ValueError('Invalid username and/or password')
