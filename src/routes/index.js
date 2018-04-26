"use strict";
var request=require('superagent');
var router = require('express').Router();
//const apiHost="http://13.229.91.88:6060";
const apiHost="http://localhost:6060";
module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);

router.get('/test', function(req, res){
    res.send({'data': [1,2,4]})
})

router.post('/postData', function(req, res){
    setTimeout(function(){
        res.send(req.body);
    }, 2000);
})

let getNamespaces = (req,res) => {
    request('GET', apiHost+'/config/v1/namespace').end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

router.get('/namespace', (req ,res) => {
    getNamespaces(req,res)
});