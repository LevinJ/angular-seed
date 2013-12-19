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
    it('insert one user', function(done) {
        userCollection.register({username: 'tom4', password: '123456', email: 'zhuangshan4@sina.com'}, function(err, docs) {
            should.not.exist(err);
            should.exist(docs);
            console.dir(err);
            console.dir(docs);
            docs[0].username.should.equal('tom');
            done();
        });
    });
});

