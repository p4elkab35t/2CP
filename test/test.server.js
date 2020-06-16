const app = require('../app');
const http = require('http');
app.set('port', 5375);
const server = http.createServer(app);

server.listen(5375);

server.on('listening', ()=>{
    console.log('TEST SERVER IS SET UP');
});
function shutDown(){
    server.close(()=>{console.log('TEST SERVER DOWN')});
}
setTimeout(shutDown,30000);
