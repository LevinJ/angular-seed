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
         userCollection.deleteUser('tom', function(err, result){
             should.not.exist(err);
            should.exist(result);
            result.should.equal(1);
            done();
        });
    });
});

