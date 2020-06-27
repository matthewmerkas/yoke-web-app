from setuptools import setup

setup(
    name='webapp',
    packages=['src'],
    include_package_data=True,
    install_requires=[
        'psycopg2-binary',
        'pycryptodome',
        'flask',
        'flask-cors',
        'flask-jwt-extended',
        'flask_sqlalchemy',
        'sqlalchemy_utils',
    ],
)
