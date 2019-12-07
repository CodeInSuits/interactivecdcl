# CDCL interactive solver
A onepage react app served by flask, deployed easily on heroku. It is used to show the steps in SAT solver(CDCL algorithm).

[Production ready example](https://interactivecdcl.herokuapp.com/)

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

### Push the code to github
```
git remote set-url origin https://github.com/CodeInSuits/interactivecdcl.git
Add and commit your code
git push origin master
```

### Deployment on heroku
```
git remote set-url heroku https://git.heroku.com/interactivecdcl.git
Add and commit your code that is ready for deployment
git push heroku master
```

## Resources

1. [static files in flask](https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)

2. [python3 virtualenv](https://stackoverflow.com/questions/23842713/using-python-3-in-virtualenv)

3. [react-bootstrap](https://react-bootstrap.github.io/)

4. [react-scrollable-anchor](https://github.com/gabergg/react-scrollable-anchor)

5. [google-maps-react](https://github.com/fullstackreact/google-maps-react)

6. [Sahil Diwan - flask and postgres on heroku](http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku/)

7. [Setting up flask app in heroku with a database](https://gist.github.com/mayukh18/2223bc8fc152631205abd7cbf1efdd41/)

8. [Testeimonials Carousel](https://codepen.io/jamy/pen/gbdWGJ)