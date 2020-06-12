const fs           = require('fs');

var user = function(id,login,pass){
  this.userId       = id;
  this.userName     = login;
  this.userPass     = pass;
  this.userType     = 1;
  this.userSession  = null;
};

var task = function (id,taskText,taskFlags,taskDate,taskDeadline) {
    this.taskId = id;
    this.taskText = taskText;
    this.taskFlags = taskFlags;
    this.taskDate = taskDate;
    this.taskDeadline = taskDeadline;
};

var newFile = function(){
    this.idMax = 0;
    this.tasks = [new task(0, 'example', [0,0,0])];
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
    fs.writeFileSync(`data/${id}.json`, JSON.stringify(new newFile(), null, ' '));
};
var c = function(usName, session){
    let authData    = JSON.parse(fs.readFileSync('data/auth_data.json'));
    authData.data[a(usName).userId].userSession = session;
    fs.writeFileSync('data/auth_data.json', JSON.stringify(authData, null, ' '));
};

var d = function(pie){
    let authData    = JSON.parse(fs.readFileSync('data/auth_data.json'));
    for(let i = 0; i <= authData.idMax; i++){
        if(pie == authData.data[i].userSession){
            return {userName:authData.data[i].userName,userId:authData.data[i].userId};
        }
    }
    return null;
};
var e = function(userId){
    let tasksData = JSON.parse(fs.readFileSync(`data/${userId}.json`));
    return tasksData;
};
var f = function(userId, taskText, taskFlags, taskDate, taskDeadline){
    let tasksData = JSON.parse(fs.readFileSync(`data/${userId}.json`));
    tasksData.idMax++;
    tasksData.tasks.push(new task(tasksData.idMax, taskText, taskFlags, taskDate, taskDeadline));
    fs.writeFileSync(`data/${userId}.json`, JSON.stringify(tasksData, null, ' '));
    return tasksData.tasks.length-1;
};
var g = function(taskId, userId){
    console.log(`начато выполнение запроса на удаление задания №${taskId}`);
    let tasksData = JSON.parse(fs.readFileSync(`data/${userId}.json`));
    var taskDelId;
    for(i=0; i<tasksData.tasks.length; i++){
        if(tasksData.tasks[i].taskId==taskId){
           taskDelId = i;
        }
    }
    tasksData.tasks.splice(taskDelId, 1);
    fs.writeFileSync(`data/${userId}.json`, JSON.stringify(tasksData, null, ' '));
    console.log(`задание №${taskId} успешно удалено`);
    return taskId
};
var h = function(userId, taskId, taskText, taskFlags, taskDeadline){
    let tasksData = JSON.parse(fs.readFileSync(`data/${userId}.json`));
    tasksData.tasks[taskId].taskText = taskText;
    tasksData.tasks[taskId].taskFlags = taskFlags;
    tasksData.tasks[taskId].taskDeadline = taskDeadline;
    fs.writeFileSync(`data/${userId}.json`, JSON.stringify(tasksData, null, ' '));
    return {taskText:taskText, taskId:taskId};
};
module.exports = {
    findByName: a,
    addUser: b,
    sessionAdd: c,
    searchForCookie: d,
    getTasksData: e,
    addTask: f,
    deleteTask: g,
    editTask: h
};