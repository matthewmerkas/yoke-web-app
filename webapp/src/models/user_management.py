import re

from src import db
from src.models.auth import authenticate
from src.models.user_model import UserModel


def validate_password(username, password):
    if password is None or len(password) > 32 or username in password:
        raise ValueError('Invalid password. Must be at least 8 characters. Cannot contain username')
    return True


def validate_username(username):
    if username is None or len(username) < 1 or len(username) > 32 or re.match(string=username,
                                                                               pattern=r"^[a-zA-Z0-9]*$") is None:
        raise ValueError('Invalid username. Must be 1-32 characters. Alphanumeric characters only')
    if UserModel.query.filter_by(username=username).scalar():
        raise ValueError('Invalid username. Username is taken')

    return True


def useradd(username, password):
    try:
        validate_username(username)
        validate_password(username, password)
    except ValueError as error:
        raise

    return UserModel(username, password)


def userdel(username, password):
    try:
        user = authenticate(username, password)
    except ValueError as error:
        raise

    db.session.delete(user)
    db.session.commit()
    return user
