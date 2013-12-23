/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var config = require('../config.js');
var assert = require("assert");
var should = require('should');
var request = require('supertest');
request = request(config.testhost);
var userCollection = require('../models/usermodel.js');


describe('usermodels', function() {
    before(function(done) {
            userCollection.removeUsers(function(err, result) {
                should.not.exist(err);
                done();
            });
        }
    );
    after(function(done) {
            userCollection.removeUsers(function(err, result) {
                should.not.exist(err);
                done();
            });
        }
    );
    it('register one user', function(done) {
        userCollection.register({username: 'tom', password: '123456', email: 'tom@sina.com'}, function(err, docs) {
            should.not.exist(err);
            should.exist(docs);
            docs[0].username.should.equal('tom');
            docs[0].email.should.equal('tom@sina.com');
            done();
        });
    });
    it('should get a user that exist', function(done) {
        userCollection.getUser('tom', function(err, docs) {
            should.not.exist(err);
            should.exist(docs);
            docs.username.should.equal('tom');
            docs.email.should.equal('tom@sina.com');
            docs.password.should.equal('123456');
            done();
        });
    });
    it('should return nothing if a user does not exist', function(done) {
        userCollection.getUser('tom2', function(err, docs) {
            should.not.exist(err);
            should.not.exist(docs);
            done();
        });
    });
    it('register one user with duplicate user name', function(done) {
        userCollection.register({username: 'tom', password: '123456', email: 'tom2@sina.com'}, function(err, docs) {
            should.not.exist(docs);
            err.should.equal('用户名已被使用');
            done();
        });
    });
    it('register one user with duplicate email', function(done) {
        userCollection.register({username: 'tom2', password: '123456', email: 'tom@sina.com'}, function(err, docs) {
            should.not.exist(docs);
            err.should.equal('邮箱已被使用');
            done();
        });
    });
    it('register one user with duplicate user name and email', function(done) {
        userCollection.register({username: 'tom', password: '123456', email: 'tom@sina.com'}, function(err, docs) {
            should.not.exist(docs);
            err.should.equal('用户名已被使用');
            done();
        });
    });
    it('should login with the right username and password', function(done) {
        var info = {username: 'tom', password: '123456'};
        userCollection.login(info, function(err, result) {
            should.not.exist(err);
            result.username.should.equal('tom');
            done();
        });
    });
    
});

describe('controllers', function() {

    before(function(done) {
            userCollection.removeUsers(function(err, result) {
                should.not.exist(err);
                done();
            });
        }
    );
    after(function(done) {
            userCollection.removeUsers(function(err, result) {
                should.not.exist(err);
                done();
            });
        }
    );

    it('should register a user', function(done) {
        postData = {username: 'jack',
            password: "123456", email: 'jian@gmail.com'};
        request
                .post('/register')
                .send(postData)
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.username.should.equal('jack');
            done();
        });
    });

    it('should fail to register a user with  deuplicate name', function(done) {
        postData = {username: 'jack',
            password: "123456", email: 'jian@gmail.com'};
        request
                .post('/register')
                .send(postData)
                .expect(400)
                .end(function(err, result) {
            should.not.exist(err);
            result.text.should.equal('用户名已被使用');
            done();
        });
    });
    it('should fail to register a user with  deuplicate email', function(done) {
        postData = {username: 'jack2',
            password: "123456", email: 'jian@gmail.com'};
        request
                .post('/register')
                .send(postData)
                .expect(400)
                .end(function(err, result) {
            should.not.exist(err);
            result.text.should.equal('邮箱已被使用');
            done();
        });
    });
    
     it('should login with the right username and password', function(done) {
        postData = {username: 'jack',
            password: "123456"};
        request
                .post('/login')
                .send(postData)
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.username.should.equal('jack');
            done();
        });
    });
    
    it('should fail to login with the wrong username', function(done) {
        postData = {username: 'jack2not',
            password: "123456"};
        request
                .post('/login')
                .send(postData)
                .expect(400)
                .end(function(err, result) {
            should.not.exist(err);
            should.exist(result);
            result.text.should.equal('该用户名不存在');
            done();
        });
    });
    
    it('should fail to login with the wrong password', function(done) {
        postData = {username: 'jack',
            password: "1234567"};
        request
                .post('/login')
                .send(postData)
                .expect(400)
                .end(function(err, result) {
            should.not.exist(err);
            should.exist(result);
            result.text.should.equal('密码错误');
            done();
        });
    });
});

