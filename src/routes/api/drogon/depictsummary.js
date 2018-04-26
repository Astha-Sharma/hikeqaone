"use strict";
var request=require('superagent');
var router = require('express').Router();
const apiHost="http://localhost:5555";


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);


let getRunningSummary = (req,res) => {
    request
        .post(apiHost+'/depict/v1/running/summary')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }else{
                res.send(err);
            }
        });
};

let getRunningDetails = (req,res) => {
    request
        .post(apiHost+'/depict/v1/running/details')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};



router.post('/running/summary', (req ,res) => {
    getRunningSummary(req,res)
});

router.post('/running/details', (req ,res) => {
    getRunningDetails(req,res)
});
