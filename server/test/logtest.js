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
var collection = require('../models/logmodel.js').logs;


describe('logmodle', function() {
     before(function(done) {
            collection.removeAll(function(err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        }
    );
    after(function(done) {
            collection.removeAll(function(err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        }
    );
    it('should insert a log', function(done) {
        var posData={username:'testuser1',
        log:{
            logtime:new Date(),
            logmsg:"this is a log for testing",
            loglevel:"error"
        }};
        collection.insert(posData, function(err, result) {
            should.not.exist(err);
            should.exist(result);
            result[0].username.should.equal('testuser1');
            done();
        });
    });
    it('should query logs by user', function(done) {
        var queryParams = {username:'testuser1'};
        collection.queryDataByuser(queryParams, function(err, result) {
            should.not.exist(err);
            should.exist(result);
//            console.dir(result);
            result[0].username.should.equal('testuser1');
            result[0].log.loglevel.should.equal('error');
            done();
        });
    });
    it('should query logs by user and log level', function(done) {
        var queryParams = {username:'testuser1',log:{loglevel:'error'}};
        collection.queryDataByuserandlevel(queryParams, function(err, result) {
            should.not.exist(err);
            should.exist(result);
//            console.dir(result);
            result[0].username.should.equal('testuser1');
            result[0].log.loglevel.should.equal('error');
            done();
        });
    });
    
    
});


describe('logcontroller', function() {
     before(function(done) {
            collection.removeAll(function(err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        }
    );
    after(function(done) {
            collection.removeAll(function(err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        }
    );
    it('should insert a log', function(done) {
        var postData={username:'testuser2',
        log:{
            logtime:new Date(),
            logmsg:"this is a log for testing",
            loglevel:"info"
        }};
        request
                .post('/logs')
                .send(postData)
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            should.not.exist(res.body.err);
//            console.dir(res.body.result);
            res.body.result[0].username.should.equal('testuser2');
            res.body.result[0].log.loglevel.should.equal('info');
            done();
        });
    });
    
     it('should query a log by username', function(done) {
        request
                .get('/logs?username=testuser2')
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            should.not.exist(res.body.err);
            res.body.result[0].username.should.equal('testuser2');
            res.body.result[0].log.loglevel.should.equal('info');
            done();
        });
    });
      
       it('should query a log by non-exist username', function(done) {
        request
                .get('/logs?username=testuser')
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            should.not.exist(res.body.err);
            res.body.result.length.should.equal(0);
            done();
        });
    });
    
});