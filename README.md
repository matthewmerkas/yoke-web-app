# yoke-web-app
Tested on a fresh install of Ubuntu 20.04 LTS

## Python Flask API backend

### Requirements
* python 3
* pipenv
* PostgreSQL server

### Instructions
```
$ cd webapp
$ pipenv install
$ pipenv run flask run
```

### Default addresses
* Flask: localhost:5000
* PostgreSQL: localhost:5432, username = postgres, password = postgres, database = webapp

These can be changed in the config.json file

## Angular frontend

### Requirements
* npm

### Instructions
```
$ cd frontend
$ npm install
$ ng serve
```

### Default address
* Angular: localhost:4200
* Angular API URL: localhost:5000

The Angular address can be changed in the angular.json file under
```
{
  "projects": {
    "my-project": {
      "architect": {
        "serve": {
          "options": {
            "host": localhost
            "port": 4200
          }
        }
      }
    }
  }
}
```
or at the command line with
```
ng serve --host <host> --port <port>
```

The Angular API URL can be changed in the src/environments/environment.ts file
