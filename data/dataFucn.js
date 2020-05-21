const fs           = require('fs');

var user = function(id,login,pass){
  this.userId       = id;
  this.userName     = login;
  this.userPass     = pass;
  this.userType     = 1;
  this.userSession  = null;
};

var a = function(usName){
    let authData    = JSON.parse(fs.readFileSync('data/auth_data.json'));
    for(let i = 0; i <= authData.idMax; i++){
        if(usName == authData.data[i].userName){
            return {userName:authData.data[i].userName,userPass:authData.data[i].userPass,userId:authData.data[i].userId, userType:authData.data[i].userType,userSession: authData.data[i].userSession}
        }
    }
    return(null);
};
var b    = function(usName,usPass){
    let authData    = JSON.parse(fs.readFileSync('data/auth_data.json'));
    let id          = 1 + authData.idMax;
    let newUser     = new user(id,usName,usPass);
    authData.data[id] = newUser;
    authData.idMax = id;
    fs.writeFileSync('data/auth_data.json', JSON.stringify(authData, null, ' '));
};
var c = function(usName, session){
    let authData    = JSON.parse(fs.readFileSync('data/auth_data.json'));
    authData.data[a(usName).userId].userSession = session;
    fs.writeFileSync('data/auth_data.json', JSON.stringify(authData, null, ' '));
};

module.exports = {
    findByName: a,
    addUser: b,
    sessionAdd: c
};