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
import string
import random
#from flask_jwt import JWT
#from werkzeug.security import safe_str_cmp

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "84qcaoiwegif"
jwt = JWTManager(app)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'linkupss'
app.config['MYSQL_DATABASE_PASSWORD'] = 'linkupssDbu2022'
app.config['MYSQL_DATABASE_DB'] = 'linkupss_db'
mysql.init_app(app)

@app.route("/adminlogin", methods=["POST"])
def adminLogin():
    username = request.json.get("user_name", None)
    password = request.json.get("user_password", None)
    numberOfRows = verifyLogin(username, password)
    if numberOfRows == 0:
        return jsonify({"code":401, "msg":"Invalid username or password", "result":[]}), 401
    else:
        accessToken = create_access_token(identity = username)
        return jsonify(access_token = accessToken)

@app.route("/adminregister", methods=["POST"])
def createAdmin():
    name = request.json.get("name", None)
    username = request.json.get("user_name", None)
    password = request.json.get("user_password", None)
    userDupeCheck = "SELECT * FROM admin WHERE user_name='"+username+"'"
    cursor = runSQL(userDupeCheck)
    numberOfRows = cursor.rowcount
    cursor.close()
    if numberOfRows > 0:
        return jsonify({"code":99, "msg":"Username already exists", "result":[]}), 200
    else:
        query = "INSERT INTO admin (name, user_name, user_password) SELECT '"+name+"', '"+username+"', get_pass('"+password+"', 'secret')"
        cursor = runSQL(query)
        accessToken = create_access_token(identity = username)
        return jsonify(access_token = accessToken)

@app.route("/organizationjoin", methods=["POST"])
@jwt_required()
def joinOrganization():
    code = request.json.get("org_code", None)
    username = request.json.get("user_name", None)
    query = "UPDATE admin SET org_id=(SELECT org_id FROM organization WHERE org_code=enc_org_code('"+code+"')) where user_name = '"+username+"'"
    cursor = runSQL(query)
    cursor.close
    return jsonify({"code":200, "msg":"Joined", "result":[]}), 200
    
@app.route("/organizationregister", methods=["POST"])
@jwt_required()
def createOrganization():
    name = request.json.get("name", None)
    name = name.replace("'","''")
    address = request.json.get("address", None)
    address = address.replace("'","''")
    code = generateOrgCode()
    query = "INSERT INTO organization (name, address, org_code) SELECT '"+name+"', '"+address+"', enc_org_code('"+code+"')"
    cursor = runSQL(query)
    cursor.close()
    return jsonify({"code":200, "msg":"Registered", "result":[code]}), 200
    
def generateOrgCode():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for i in range(7))

def runSQL(query):
    print(query)
    connect = mysql.connect()
    cursor = connect.cursor()
    cursor.execute(query)
    connect.commit()
    return cursor

def verifyLogin(username, password):
    #username can be used for sql injection
    query = "SELECT * FROM admin WHERE user_name='"+username+"' AND user_password=get_pass('"+password+"','secret')"
    print(query)
    cursor = runSQL(query)
    numberOfRows = cursor.rowcount
    print(numberOfRows)
    cursor.close()
    return numberOfRows

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=7000)