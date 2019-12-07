# flask and react deployed on heroku
a onepage react app served by flask & sqlite/postgres db, deployed easily on heroku.

[Production ready example](https://gili-matan.herokuapp.com/)

# Usage

### Local Development
```
$ git clone...
$ cd <>
```

### Server
```
$ virtualenv -p python3 venv
$ pip install -r requirements.txt
$ gunicorn app:app
```

### Client
```
$ cd client
$ npm install
To build client: `npm run build`

To check the build directory on a static server :
```
$ cd build
$ python3 -m http.server
```

### Deployment on heroku

## Resources

1. [static files in flask](https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)

1. [python3 virtualenv](https://stackoverflow.com/questions/23842713/using-python-3-in-virtualenv)

1. [react-bootstrap](https://react-bootstrap.github.io/)

1. [react-scrollable-anchor](https://github.com/gabergg/react-scrollable-anchor)

1. [google-maps-react](https://github.com/fullstackreact/google-maps-react)

1. [Sahil Diwan - flask and postgres on heroku](http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku/)

1. [Setting up flask app in heroku with a database](https://gist.github.com/mayukh18/2223bc8fc152631205abd7cbf1efdd41/)

1. [Testeimonials Carousel](https://codepen.io/jamy/pen/gbdWGJ)