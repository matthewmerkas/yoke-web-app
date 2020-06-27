from Crypto.Hash import SHA256
from Crypto.Random import get_random_bytes
from Crypto.Random.random import randrange

from src import db


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    salt = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, username, password, **kwargs):
        super(UserModel, self).__init__(**kwargs)
        salt = get_random_bytes(randrange(96, 128)).hex()
        self.username = username
        self.password = SHA256.new(password.encode() + salt.encode()).hexdigest()
        self.salt = salt
        db.session.add(self)
        db.session.commit()

    def __str__(self):
        return "User(id='{}')".format(self.id)
