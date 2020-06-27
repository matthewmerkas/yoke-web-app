from src import db


def is_jti_blacklisted(jti):
    query = RevokedTokenModel.query.filter_by(jti=jti).first()
    return bool(query)


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, unique=True, nullable=False)

    def __init__(self, jti, **kwargs):
        super(RevokedTokenModel, self).__init__(**kwargs)
        self.jti = jti
        db.session.add(self)
        db.session.commit()

    def __str__(self):
        return "RevokedTokenModel(id='{}')".format(self.id)
