/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(app) {

    app.get('/position', function(req, res) {
        res.send({helloword: "get hello world from nodejs"});
    });
    app.put('/position', function(req, res) {
        res.send({helloword: "put hello world from nodejs"});
    });
     app.post('/position', function(req, res) {
        res.send({helloword: "post hello world from nodejs"});
    }); 
    app.delete('/position', function(req, res) {
        res.send({helloword: "delete hello world from nodejs"});
    });
    
};

