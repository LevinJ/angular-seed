/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var config = require('../config.js');
var assert = require("assert");
var should = require('should');
var request = require('supertest');
request = request(config.testhost);
var trackinglistCollection = require('../models/positionmodel.js');

describe('controllers', function() {

    it('get all positions', function(done) {
        request
                .get('/position?endtime="2015-04-30T16:00:00.000Z"&starttime="2010-03-31T16:00:00.000Z"&username=user')
                .expect(200)
                .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            console.dir(err);
            console.dir(res.body);
//            res.body.result.length.should.equal(9);
            done();
        });
    });

});


