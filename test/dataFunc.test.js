process.env.NODE_ENV = 'test';

let funcData    = require("../data/dataFunc.js"),
    chai        = require('chai'),
    fs          = require('fs'),
    expect      = chai.expect;

const taskData = {
    "idMax": 1,
    "tasks": [
        {
            "taskId": "example0",
            "taskText": "example0",
            "taskDate": "exampleDate0",
            "taskDeadline": ""
        }
    ]
};
const authData = {
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
};

describe('Data functions', ()=>{
    afterEach((done) => {
        fs.writeFileSync('./data/auth_data.json', JSON.stringify(authData, null, ' '));
        fs.writeFileSync('./data/0.json', JSON.stringify(taskData, null, ' '));
        done();
    });
    describe('Find User By Name', ()=>{
        it('it should send user data if name is correct', (done)=>{
            expect(funcData.findByName('test')).to.eql({userName:'test',userPass:'test',userId:0, userType:1,userSession: '111'});
            done();
        });
        it('it should send null if name is incorrect', (done)=>{
            expect(funcData.findByName('abcbcbcbcbcbcbbcbcbc')).to.eql(null);
            done();
        });
    });
    describe('Find by auth token', ()=>{
        it('it should send user data if cookie is correct', (done)=>{
            expect(funcData.searchForCookie('111')).to.eql({userName:'test',userId:0});
            done();
        });
        it('it should send null if cookie is incorrect', (done)=>{
            expect(funcData.searchForCookie('ababbdbdbdbabdba')).to.eql(null);
            done();
        });
    });
    describe('Get tasks data', ()=>{
        it('it should send tasks data if id is exist', (done)=>{
            expect(funcData.getTasksData(0)).to.eql({"idMax": 1,"tasks":[{"taskId": "example0","taskText": "example0","taskDate": "exampleDate0","taskDeadline": ""}]});
            done();
        });
    });
    describe('Delete auth token', ()=>{
        it('it should send 1 if cookie is correct', (done)=>{
            expect(funcData.sessionDelete('test')).to.eql(1);
            done();
        });
    });

});