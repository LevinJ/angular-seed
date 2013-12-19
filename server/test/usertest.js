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
    it('remove the user if it exists', function(done) {
        userCollection.deleteUser('tom', function(err, result) {
            should.not.exist(err);
            should.exist(result);
            done();
        });
    });
    it('register one user', function(done) {
        userCollection.register({username: 'tom', password: '123456', email: 'tom@sina.com'}, function(err, docs) {
            should.not.exist(err);
            should.exist(docs);
            docs[0].username.should.equal('tom');
            docs[0].email.should.equal('tom@sina.com');
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
    it('remove one user', function(done) {
        userCollection.deleteUser('tom', function(err, result) {
            should.not.exist(err);
            should.exist(result);
            result.should.equal(1);
            done();
        });
    });
});

describe('controllers', function() {

    before(function(done) {
            userCollection.deleteUser('jack', function(err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        }
    );
    after(function(done) {
            userCollection.deleteUser('jack', function(err, result) {
                should.not.exist(err);
                should.exist(result);
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
//            console.dir(res.body);
            res.body.result[0].username.should.equal('jack');
            done();
        });
    });

    it('should fail to register a user with  deuplicate name', function(done) {
        postData = {username: 'jack',
            password: "123456", email: 'jian@gmail.com'};
        request
                .post('/register')
                .send(postData)
                .expect(200)
                .end(function(err, result) {
            should.not.exist(err);
            should.exist(result.body.err);
            done();
        });
    });
});

