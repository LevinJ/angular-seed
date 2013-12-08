/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function(app) {

    app.get('/helloworld', function(req, res) {
        res.send({helloword: "get hello world from nodejs"});
    });
    app.put('/helloworld', function(req, res) {
        res.send({helloword: "put hello world from nodejs"});
    });
     app.post('/helloworld', function(req, res) {
        res.send({helloword: "post hello world from nodejs"});
    }); 
    app.delete('/helloworld', function(req, res) {
        res.send({helloword: "delete hello world from nodejs"});
    });
    
};



