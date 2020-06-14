process.env.NODE_ENV = 'test';

let funcData    = require("../data/dataFunc.js"),
    chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    app         = require('../app.js'),
    fs          = require('fs'),
    expect      = chai.expect;
chai.use(chaiHttp);
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
describe('Auth methods', ()=>{
    afterEach((done) => {
        fs.writeFileSync('./test/data/auth_data.json', JSON.stringify(authData, null, ' '));
        done();
    });
    describe('cookie-auto-auth', ()=>{
        it('it should send 1 if cookie is correct', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .get('/t1')
                .set('Cookie', 'auth0=111')
                .end(function(error, res, body){
                    expect(res.text).to.equal('1');
                    done();
                });
        });
        it('it should send 2 if cookie is incorrect', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .get('/t1')
                .set('Cookie', 'auth0=222')
                .end(function(error, res, body){
                    expect(res.text).to.equal('2');
                    done();
                });
        });
    });
    describe('post /signin', ()=>{
        it('it should signin if password and login are correct', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({login: 'test', password: 'test'})
                .end(function(error, res, body) {
                    expect(res).to.have.status(200);
                    done();
                   // expect(res).to.have.cookie('auth0');
                });
        });
        it('it shouldn\'t signin if password or login are incorrect', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({login: 'test', password: 'tset'})
                .end(function(error, res, body) {
                    expect(res).to.have.status(403);
                    done();
                });
        });
        it('it shouldn\'t signin if password and login are empty', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(null)
                .end(function(error, res, body) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
    describe('post /signup', ()=>{
        it('it should signup if password and login are correct', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signup')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({login: 'tset', password: 'test'})
                .end(function(error, res, req) {
                    expect(res).to.have.status(201);
                    done();
                });
        });
        it('it shouldn\'t signup if login are duplicate', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signup')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({login: 'test', password: 'test'})
                .end(function(error, res, body) {
                    expect(res).to.have.status(409);
                    done();
                });
        });
        it('it shouldn\'t signup if password and login are empty', (done)=>{
            chai
                .request('127.0.0.1:5375')
                .post('/signup')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(null)
                .end(function(error, res, body) {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    });

});