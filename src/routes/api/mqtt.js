"use strict";
var request=require('superagent');
var router = require('express').Router();
const apiHost = "http://13.228.217.203:6002/getconnect?duration=";
const responseDistribution = "http://13.228.217.203:6002/timedistribution"
const cardData = "http://13.228.217.203:6001/getupdowntime"


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);

let getResults = (req,res) => {

    request('GET', apiHost+"1h").end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getresults24hours = (req,res) => {

    request('GET', apiHost+"24h").end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getResponseDist = (req,res) => {
    request('GET', responseDistribution).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getCardData = (req,res) => {
    request('GET', cardData).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

router.get('/getresults', (req ,res) => {
    getResults(req,res);
});

router.get('/getresults24hours', (req ,res) => {
    getresults24hours(req,res);
});

router.get('/getresponsedist', (req ,res) => {
    getResponseDist(req,res);
});

router.get('/getcarddata', (req ,res) => {
    getCardData(req,res);
});

