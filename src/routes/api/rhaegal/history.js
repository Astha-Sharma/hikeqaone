"use strict";
var request=require('superagent');
var router = require('express').Router();
var multer = require("multer");
var fs = require('fs');
const apiHost="http://54.255.225.152:6060";
//const apiHost="http://localhost:6060";
module.exports = router;


let getAllRuns = (req,res) => {
    request('GET',  apiHost+'/report/v1/suite/'+req.params.suiteId).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getRunDetailsByRunID = (req,res) => {
    request
        .post(apiHost+'/report/v1/stats')
        .send(JSON.stringify({runId: req.params.runId}))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

router.get('/getAllRuns/:suiteId', (req ,res) => {
    getAllRuns(req,res)
});


router.get('/getRunDetailsByRunId/:runId', (req ,res) => {
    getRunDetailsByRunID(req,res)
});
