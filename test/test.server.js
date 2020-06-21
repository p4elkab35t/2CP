const app           = require('../app');
const http          = require('http');
const fs            = require('fs');
app.set('port', 5375);
const server = http.createServer(app);

fs.writeFileSync('../data/auth_data.json', JSON.stringify({
    "idMax": 0,
    "data": [
        {
            "userId": 0,
            "userName": "test",
            "userPass": "test",
            "userType": 1,
            "userSession": "111"
        }
    ]
}, null, ' '));
fs.writeFileSync('../data/0.json', JSON.stringify({
    "idMax": 1,
    "tasks": [
        {
            "taskId": "example0",
            "taskText": "example0",
            "taskDate": "exampleDate0",
            "taskDeadline": ""
        }
    ]
}, null, ' '));

server.listen(5375);

server.on('listening', ()=>{
    console.log('TEST SERVER IS SET UP');
});
function shutDown(){
    server.close(()=>{console.log('TEST SERVER DOWN')});
}



setTimeout(shutDown,30000);
