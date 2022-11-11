#pip install flask-mysql
#pip install waitress
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
#from flask_cors import CORS
import string
import uuid
import random
#from flask_jwt import JWT
#from werkzeug.security import safe_str_cmp

app = Flask(__name__)

#CORS(app)

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
    returnValue = verifyLogin(username, password)
    if returnValue[0] == 0:
        return jsonify({"code":401, "msg":"Invalid username or password", "result":[]}), 401
    else:
        accessToken = create_access_token(identity = username)
        response = jsonify(access_token = accessToken,result=returnValue[1])
        #response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route("/adminregister", methods=["POST"])
def createAdmin():
    name = request.json.get("name", None)
    username = request.json.get("user_name", None)
    password = request.json.get("user_password", None)
    email = request.json.get("extra_info", None)
    userDupeCheck = "SELECT * FROM admin WHERE user_name='"+username+"'"
    cursor = runSQL(userDupeCheck)
    numberOfRows = cursor.rowcount
    cursor.close()
    if numberOfRows > 0:
        return jsonify({"code":99, "msg":"Username already exists", "result":[]}), 200
    else:
        query = "INSERT INTO admin (name, user_name, user_password, extra_info) SELECT '"+name+"', '"+username+"', get_pass('"+password+"', 'secret'), '{\"email\":\""+email+"\"}'"
        cursor = runSQL(query)
        accessToken = create_access_token(identity = username)
        response = jsonify(access_token = accessToken)
        #response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route("/organizationjoin", methods=["POST"])
@jwt_required()
def joinOrganization():
    code = request.json.get("org_code", None)
    username = request.json.get("user_name", None)
    query = "UPDATE admin SET org_id=(SELECT org_id FROM organization WHERE org_code=enc_org_code('"+code+"')) WHERE user_name = '"+username+"'"
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

@app.route("/participantregister", methods=["POST"])
def createParticipant():
    name = request.json.get("name", None)
    name = name.replace("'","''")
    uuidstr = str(uuid.uuid4())
    query = "INSERT INTO participant (name, extra_info) SELECT '"+name+"', '{\"uuid\":\""+uuidstr+"\"}'"
    cursor = runSQL(query)
    cursor.close()
    query ="SELECT participant_id FROM participant WHERE JSON_EXTRACT(extra_info,'\$.uuid')='"+uuidstr+"'";
    #query="SELECT * FROM participant";
    cursor = runSQL(query)
    #Executed_DATA = cursor.fetchall()
    r = [dict((cursor.description[i][0], value)
    for i, value in enumerate(row)) for row in cursor.fetchall()]
    return jsonify({"code":200, "msg":"Registered", "result":r}), 200
    
@app.route("/participantjoin", methods=["POST"])
def participantJoinOrg():
    code = request.json.get("org_code", None)
    participantID = request.json.get("participant_id", None)
    query = "UPDATE participant SET org_id=(SELECT org_id FROM organization WHERE org_code=enc_org_code('"+code+"')) WHERE participant_id = "+str(participantID)
    cursor = runSQL(query)
    cursor.close()
    return jsonify({"code":200, "msg":"Joined", "result":[]}), 200
    
@app.route("/createsession", methods=["POST"])
@jwt_required()
def createSession():
    name = request.json.get("name", None)
    orgID = request.json.get("org_id", None)
    orgID = str(orgID)
    tag = request.json.get("tag", None)
    url = request.json.get("url", None)
    startTime = request.json.get("start_time", None)
    recurring = request.json.get("recurring", None)
    if recurring > 1:
        recurring = 1
    recurring = str(recurring)
    password = request.json.get("password", None)
    dayOfWeek = request.json.get("day_of_week", None)
    query = "INSERT INTO session (name, org_id, tag, url, start_time, recurring, password, day_of_week) SELECT '"+name+"','"+orgID+"','"+tag+"','"+url+"','"+startTime+"','"+recurring+"','"+password+"','"+dayOfWeek+"'"
    cursor = runSQL(query)
    cursor.close()
    return jsonify({"code":200, "msg":"Created", "result":[]}), 200
    
@app.route("/fetchinfo", methods=["POST"])
@jwt_required()
def fetchorgdata():
    
    adminID = request.json.get("admin_id", None)
    
    query = "select org.*, dec_org_code(org.org_code) display_org_code from organization org join admin adm on org.org_id=adm.org_id and admin_id="+str(adminID)
    
    r=fetchData(query)
    query = "select s.* from session s,organization o,admin a where a.org_id=o.org_id and o.org_id=s.org_id and admin_id="+str(adminID)
    r2=fetchData(query)
    return jsonify({"code":200, "msg":"orgdata", "orgdata":r,"sessions":r2}), 200
    
@app.route("/participantlist", methods=["POST"])
@jwt_required()
def participantList():
    adminID = request.json.get("admin_id", None)
    query = "select p.* from participant p,organization o,admin a where a.org_id=o.org_id and o.org_id=p.org_id and admin_id="+str(adminID)
    r=fetchData(query)
    return jsonify({"code":200, "msg":"orgdata", "participants":r}), 200

@app.route("/addtosession", methods=["POST"])
def joinSession():
    participantID = request.json.get("participant_id", None)
    sessionID = request.json.get("session_id", None)
    query = "insert into participant_session (participant_id, session_id) select '"+str(participantID)+"','"+str(sessionID)+"'"
    cursor = runSQL(query)
    cursor.close()
    return jsonify({"code":200, "msg":"Added","result":[]}), 200
    
@app.route("/checkfortrigger", methods=["POST"])
def checkTrigger():
    participantID = request.json.get("participant_id", None)
    query = "select url, password from session s, participant_session ps where ps.session_id=s.session_id and invite=1 and participant_id="+str(participantID)
    print(query)
    r=fetchData(query)
    return jsonify({"code":200, "msg":"triggermeeting","meetinginfo":r}), 200

@app.route("/triggermeeting", methods=["POST"])
def triggerMeeting():
    sessionID = request.json.get("session_id", None)
    query = "update participant_session set invite=1 where session_id="+str(sessionID)
    cursor = runSQL(query)
    cursor.close()
    query = "create event update_session on schedule at current_timestamp + interval 1 minute do update participant_session set invite = 0 where session_id="+str(sessionID)
    cursor = runSQL(query)
    cursor.close()
    return jsonify({"code":200, "msg":"trigger sent","result":[]}), 200
    
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
    query = "SELECT admin_id FROM admin WHERE user_name='"+username+"' AND user_password=get_pass('"+password+"','secret')"
    cursor = runSQL(query)
    numberOfRows = cursor.rowcount
    r = [dict((cursor.description[i][0], value)
    for i, value in enumerate(row)) for row in cursor.fetchall()]
    cursor.close()
    #print(r)
    return numberOfRows, r
    
def fetchData(query):
    cursor=runSQL(query)
    r = [dict((cursor.description[i][0], value)
    for i, value in enumerate(row)) for row in cursor.fetchall()]
    cursor.close()
    return r

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=7000)