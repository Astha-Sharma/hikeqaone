"use strict";
var request=require('superagent');
var router = require('express').Router();
var multer = require("multer");
var fs = require('fs');
const apiHost="http://54.255.225.152:6060";
//const apiHost="http://localhost:6060";
module.exports = router;

let getSummary = (req,res) => {
    request
        .post(apiHost+'/report/v1/summary')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }else{
                res.send(err);
            }
        });
};

let getRunDetails = (req,res) => {
    request
        .post(apiHost+'/report/v1/details')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

let getRunStats = (req,res) => {
    request
        .post(apiHost+'/report/v1/stats')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

let getRunningInstances = (req,res) => {
    console.log("Aya getRunningInstances API Call.....")
    request('GET',  apiHost+'/report/v1/runs').end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

router.post('/getsummary', (req ,res) => {
    getSummary(req,res)
});

router.post('/getrundetails', (req ,res) => {
    getRunDetails(req,res)
});

router.post('/getstats', (req ,res) => {
    getRunStats(req,res)
});

router.get('/getRunningInstances', (req ,res) => {
    console.log("Aya getRunningInstances .....")
    getRunningInstances(req,res)
});


