#pip install flask-mysql
#pip install waitress
#python hellapi.py
#pip install Flask-JWT
#pip install flask-jwt-extended
#sudo apt install -y httpie
from flask import Flask,jsonify
from flaskext.mysql import MySQL
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#from flask_jwt import JWT
#from werkzeug.security import safe_str_cmp

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'super-secret'
#jwt = JWT(app, authenticate, identity)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'linkupss'
app.config['MYSQL_DATABASE_PASSWORD'] = 'linkupssDbu2022'
app.config['MYSQL_DATABASE_DB'] = 'linkupss_db'
mysql.init_app(app)

@app.route('/')
def hello_world():
        return 'Hello, World! API works!'
@app.route('/db')
def hello_mysql():
    cursor = run_sql('SELECT * FROM test1')
    r = [dict((cursor.description[i][0], value)
                for i, value in enumerate(row)) for row in cursor.fetchall()]
    cursor.close()
    return jsonify({'ev_code':0,'ev_message':'','ev_result' : r})
    
#test script: http POST http://localhost:6000/login username=test password=test
#or curl -X POST     -H 'Content-Type: application/json' -d '{"username":"test","password":"test"}' http://localhost:6000/login
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    rc=verify_user(username,password)
    #if username != "test" or password != "test":
    if rc==0:
        return jsonify({"ev_code":401,"ev_msg": "Bad username or password","ev_result":[]}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

def run_sql(sql):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(sql)
    return cursor

def verify_user(username,password):
    sql="SELECT * FROM admin WHERE user_name='"+username+ "' AND user_password=md5(md5(concat('"+password+"','secret')))"
    print (sql)
    cursor=run_sql(sql)
    number_of_rows=cursor.rowcount
    cursor.close()
    return number_of_rows

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=6000)