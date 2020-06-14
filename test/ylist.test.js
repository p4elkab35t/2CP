process.env.NODE_ENV = 'test';

let funcData    = require("../data/dataFunc.js"),
    chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    app         = require('../app.js'),
    fs          = require('fs'),
    expect      = chai.expect;
chai.use(chaiHttp);
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
describe('Data methods', ()=> {
    after((done) => {
        fs.writeFileSync('./test/data/0.json', JSON.stringify(taskData, null, ' '));
        done();
    });
    describe('task CRUD', () => {
        it('it should add task on ylist/create and return max index that in test case is 1', (done) => {
            chai
                .request('127.0.0.1:5375')
                .post('/ylist/create')
                .set('Cookie', 'auth0=111')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({taskText: "example", taskFlags: [0, 0, 0], taskDeadline: null})
                .end(function (error, res, body) {
                    expect(res.text).to.equal('1');
                    done();
                });
        });
        it('it should delete task on ylist/delete and return id of the task which in the test case is 0', (done) => {
            chai
                .request('127.0.0.1:5375')
                .post('/ylist/delete')
                .set('Cookie', 'auth0=111')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({taskId:0})
                .end(function (error, res, body) {
                    expect(res.text).to.equal('0');
                    done();
                });
        });
        it('it should edit task on ylist/update and return new task text and task id that in test case is 1', (done) => {
            chai
                .request('127.0.0.1:5375')
                .post('/ylist/update')
                .set('Cookie', 'auth0=111')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({taskId:0 ,taskText: "1", taskFlags: [0, 0, 0], taskDeadline: null})
                .end(function (error, res, body) {
                    expect(res.text).to.equal("{\"taskText\":\"1\",\"taskId\":\"0\"}");
                    done();
                });
        });
        it('it should read tasks on ylist/read and return all of them for current user', (done) => {
            chai
                .request('127.0.0.1:5375')
                .get('/ylist/read')
                .set('Cookie', 'auth0=111')
                .end(function (error, res, body) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
describe('get ylist/logout', () => {
    after((done) => {
        fs.writeFileSync('./test/data/auth_data.json', JSON.stringify(authData, null, ' '));
        done();
    });
    it('it should logout and delete session', (done) => {
        chai
            .request('127.0.0.1:5375')
            .get('/ylist/logout')
            .set('Cookie', 'auth0=111')
            .end(function (error, res, body) {
                expect(res).to.have.cookie('auth0','0');
                expect(res.text).to.be.equal('1');
                done();
            });
    });
});