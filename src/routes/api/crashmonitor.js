"use strict";
var request=require('superagent');
var router = require('express').Router();
const trendData = "http://13.228.217.203:6001/crashfreetrendsandroid"
const topBuilds = "http://13.228.217.203:6001/crashfreetrendsandroidtop"
const trendDataIos = "http://13.228.217.203:6001/crashfreetrendsios"
const androidVersions = "http://13.228.217.203:6001/androidbuildsversion"
const androidCrashByVrsion = "http://13.228.217.203:6001/androidcrashbyversion?version="
const microAppsCrashes = "http://13.228.217.203:6001/microappscrashes"


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);

let getAndroidTrends = (req,res) => {
    request('GET', trendData).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getIosTrends = (req,res) => {
    request('GET', trendDataIos).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getAndroidTrendsTopBuilds = (req,res) => {
    request('GET', topBuilds).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};


let getAndroidVersions = (req,res) => {
    request('GET', androidVersions).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getAndroidCrashByVersion = (req,res) => {
    request('GET', androidCrashByVrsion + req.params.version).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getMicroAppsCrashes = (req, res) => {
    request('GET', microAppsCrashes).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
}

router.get('/getandroidtrends', (req ,res) => {
    getAndroidTrends(req,res);
});

router.get('/getiostrends', (req ,res) => {
    getIosTrends(req,res);
});

router.get('/getAndroidTrendsTopBuilds', (req ,res) => {
    getAndroidTrendsTopBuilds(req,res);
});

router.get('/getallandroidversion', (req ,res) => {
    getAndroidVersions(req,res);
});

router.get('/androidcrashbyversion/:version', (req ,res) => {
    getAndroidCrashByVersion(req,res);
});

router.get('/microappcrashes', (req, res) => {
    getMicroAppsCrashes(req, res);
});

