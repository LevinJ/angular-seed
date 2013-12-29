/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var config = require('../config.js');
var assert = require("assert");
var should = require('should');
var request = require('supertest');
request = request(config.testhost);
var collection = require('../models/positionmodel.js').positions;

describe('controllers', function() {
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
    it('should insert a position', function(done) {
        var postData={"coords": {
        "latitude": 31.2539564,
        "longitude": 121.5784224,
        "altitude": 0,
        "accuracy": 136
      }};
        request
                .post('/position')
                .send(postData)
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
//            console.dir(res.body.result);
            res.body.result[0].user.should.equal("testuser");
            res.body.result[0].coords.latitude.should.equal(31.2539564);
            res.body.result[0].coords.longitude.should.equal(121.5784224);
            res.body.result[0].baiduCoords.error.should.equal(0);
            res.body.result[0].baiduCoords.x.should.equal("MTIxLjU4OTExNzE3Mzk0");
            res.body.result[0].baiduCoords.y.should.equal("MzEuMjU3OTE4MDgxNzQ=");
            done();
        });
    });

    it('get all positions', function(done) {
        request
                .get('/position?endtime="2019-04-30T16:00:00.000Z"&starttime="2010-03-31T16:00:00.000Z"&username=testuser')
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.result[0].user.should.equal("testuser");
            res.body.result[0].coords.latitude.should.equal(31.2539564);
            res.body.result[0].coords.longitude.should.equal(121.5784224);
            res.body.result.length.should.equal(1);
            done();
        });
    });

});


