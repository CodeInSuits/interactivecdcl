# CDCL interactive solver
An react app used to show the steps in SAT solver(CDCL algorithm). This project is built for Princeton University course [COS516](https://www.cs.princeton.edu/courses/archive/fall19/cos516/index.html) taught by professor [Aarti Gupta](https://www.cs.princeton.edu/~aartig/).

[Visit live site @ https://interactivecdcl.herokuapp.com](https://interactivecdcl.herokuapp.com/)

## Usage

### Local Development
```
$ git clone...
$ cd <>
```

### Setting up virtual environment
In the top level of interactivecdcl, run:

```
$ virtualenv -p python3 venv
$ source ./venv/bin/activate # to activate virtual environment
$ pip install -r requirements.txt
```

#### Make sure to activate the virtual environment for all the following steps. To deactivate, simply run `deactivate`.

### Server
In the top level of interactivecdcl, run:

```
$ gunicorn app:app
```

### Client
```
$ cd client
$ npm install
```

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

#### Make sure to build client first before pushing to Heroku to reflect most current local changes

## Resources

1. [static files in flask](https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask)

2. [python3 virtualenv](https://stackoverflow.com/questions/23842713/using-python-3-in-virtualenv)

## Acknowledgements

1. [liranfar/flask-react-on-heroku - used to set up framework](https://github.com/liranfar/flask-react-on-heroku)

2. [z11i/pysat - used to computer clauses and generate graph info](https://github.com/z11i/pysat)

## License

Open sourced under the [MIT license](LICENSE.md).
