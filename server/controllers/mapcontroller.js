/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var db = require('../models/positionmodel.js');
var trackinglistCollection = require('../models/trackinglistmodel.js');
module.exports = function(app) {

    app.get('/position', function(req, res) {
        console.log(req.originalUrl);
        req.query.starttime = new Date(JSON.parse(req.query.starttime));
        req.query.endtime = new Date(JSON.parse(req.query.endtime));
        db.positions.qeuryPositions(req.query,function(err, result) {
            res.send({err: err,
                result: result});
        });

    });

    app.post('/position', function(req, res) {
        req.body.user = req.user.username;
        req.body.submitDate = new Date();
        db.positions.insertPosition(req.body, function(err, result) {
            res.send({err: err,
                result: result});
        });
    });
    app.delete('/position', function(req, res) {
        res.send({helloword: "delete hello world from nodejs"});
    });
    app.put('/position', function(req, res) {
        res.send({helloword: "put hello world from nodejs"});
    });
    
    app.get('/trackinglist', function(req, res) {
        trackinglistCollection.qeuryTrackingList(req.query,function(err, result) {
            res.send({err: err,
                result: result});
        });

    });

    app.post('/trackinglist', function(req, res) {
        trackinglistCollection.insertTrackinglist(req.body, function(err, result) {
            res.send({err: err,
                result: result});
        });
    });

};

