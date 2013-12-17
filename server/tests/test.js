/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var assert = require("assert");
var should = require('should');
var request = require('supertest');
var trackinglistCollection = require('../models/trackinglistmodel.js');
describe('models', function() {
    describe('trackinglist', function() {
//    it('should return -1 when the value is not present', function(){
//      assert.equal(-1, [1,2,3].indexOf(5));
//      assert.equal(-1, [1,2,3].indexOf(0));
//    })

        it('should replace the user with new tracking list', function(done) {
            queryParams = {};
            queryParams.user = "user";
            trackinglistCollection.qeuryTrackingList(queryParams, function(err, result) {
                should.not.exist(err);
                should.exist(result);
                result.trackinglist.length.should.equal(3);
                done();
            });
        });
    })
});

describe('controllers', function() {
    describe('trackinglist', function() {
        var url = 'http://localhost:8002';
        it('should replace the user with new tracking list', function(done) {
            request(url)
                    .get('/trackinglist?user="user"')
                    .expect(200)
                    .end(function(err, result) {
                        should.not.exist(err);
                        should.exist(result);
                        console.dir(result);
//                        result.trackinglist.length.should.equal(3);
                        done();
                    });
        });
    })
});


