"use strict";
var request=require('superagent');
var router = require('express').Router();
const apiHost="http://localhost:7070";


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);

let getSuites = (req,res) => {

    request('GET', apiHost+'/reports/v1/suite').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};

let getRuns = (req,res) => {

    request('GET', apiHost+'/reports/v1/suite/'+req.params.runId+'/runs').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};

let getTests = (req,res) => {

    request('GET', apiHost+'/reports/v1/testcase/'+req.params.runId+'/runs').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};

router.get('/getsuites', (req ,res) => {
    getSuites(req,res);
});

router.get('/getruns/:runId/runs', (req ,res) => {
    getRuns(req,res);
});

router.get('/gettests/:runId/runs', (req ,res) => {
    getTests(req,res);
});


