var express = require('express');
var ejs= require('ejs');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
   var response = {
        "mobile_number":(req.body.mobile_number).toString(),
        "password":(req.body.password).toString()
    };
  const t= fetch('http://zuspay.com:1337/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
        })
        .then(function(rec){ return rec.json()})
        .then(function(json){
            if(json.success){
                res.render('success',{
                    Username: json.datas.first_name + ' ' +json.datas.last_name,
                    message: json.message
                });
            } else {
                res.render('index');
            }
        });

});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});