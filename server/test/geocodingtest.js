/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var config = require('../config.js');
var geocoding = require('../models/geocoding.js');
var should = require('should');

describe('geocodingmodle', function() {
    this.timeout(5000);
    it('should convert standard coordicate to baidu coordicate', function(done) {
        var originallat = "31.2539564";
        var originallon = "121.5784224";
        geocoding.converttoBaiduCord(originallat, originallon,function(err, result){
//             this.timeout(5000);
             should.not.exist(err);
            should.exist(result);
            console.dir(result);
            result.x.should.equal("MTIxLjU4OTExNzE3Mzk0");
            result.y.should.equal("MzEuMjU3OTE4MDgxNzQ=");
            result.error.should.equal(0);
            done();
        });
    });    
    
    it('should convert standard coordicate to formated address', function(done) {
//         this.timeout(5000);
        var originallat = "39.983424";
        var originallon = "116.322987";
        geocoding.converttoBaiduAddress(originallat, originallon,function(err, result){
             should.not.exist(err);
            should.exist(result);
            console.dir(result);
            result.status.should.equal(0);
            result.result.formatted_address.should.equal('北京市海淀区中关村大街27号1101-08室');
            done();
        });
    });  
});
