/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var assert = require("assert");
var should = require('should');
var request = require('supertest');
request = request('http://localhost:8002');
var trackinglistCollection = require('../models/trackinglistmodel.js');
describe('models', function() {
    it('should query the tracking list for user', function(done) {
        queryParams = {};
        queryParams.user = "user";
        trackinglistCollection.qeuryTrackingList(queryParams, function(err, result) {
            should.not.exist(err);
//            should.exist(result);
//            result.trackinglist.length.should.equal(7);
            done();
        });
    });
});

describe('controllers', function() {

    it('should get the tracking list for user', function(done) {
        request
                .get('/trackinglist?user=user')
                .expect(403)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
//            console.dir(res.body);
//            res.body.result.trackinglist.length.should.equal(7);
            done();
        });
    });

    it('should replace the tracking list for user', function(done) {
        postData = {user: 'user',
            trackinglist: ['user2', 'user1', 'user3', 'user4', 'user5', 'user7', 'user10']};
        request
                .post('/trackinglist')
                .send(postData)
                .expect(403)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
//            console.dir(res.body);
//            res.body.result.trackinglist.length.should.equal(7);
            done();
        });
    });

});


