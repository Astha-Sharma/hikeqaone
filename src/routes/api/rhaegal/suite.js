"use strict";
var request=require('superagent');
var router = require('express').Router();
var multer = require("multer");
var fs = require('fs');
const apiHost="http://54.255.225.152:6060";
//const apiHost="http://localhost:6060";
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});
let multerUploader = multer({ storage: storage});


module.exports = router;

router.get('/', [function(){
    //console.log("In Path...")
}]);


let getNamespaces = (req,res) => {
    request('GET', apiHost+'/config/v1/namespace').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};

let getComponentsForNamespace = (req,res) => {
    request('GET',  apiHost+'/config/v1/namespace/'+req.params.namespace+'/component').end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let getSuites = (req,res) => {
    request('GET',  apiHost+'/config/v1/namespace/'+req.params.namespace+'/component/'+req.params.component+'/suite').end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let deleteSuites = (req,res) => {
    request('DELETE',  apiHost+'/config/v1/namespace/'+req.params.namespace+'/component/'+req.params.component+'/suite/'+req.params.suite).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};

let creteSuite = (req,res) => {
    if(typeof req.files[1]!='undefined'){
        request
            .post(apiHost+'/config/v1/namespace/'+req.body.nameSpaces+'/component/'+req.body.components+'/suite')
            .field('suiteName', req.body.suiteName)
            .field('type', 'System')
            .field('createdBy', req.body.createdBy)
            .attach('jmxFile', req.files[0].path)
            .attach('csvFile', req.files[1].path)
            .end(function(err, result){
                if (!err) {
                    res.send(result);
                }
            });
    }else{
        request
            .post(apiHost+'/config/v1/namespace/'+req.body.nameSpaces+'/component/'+req.body.components+'/suite')
            .field('suiteName', req.body.suiteName)
            .field('type', 'System')
            .field('createdBy', req.body.createdBy)
            .attach('jmxFile', req.files[0].path)
            .end(function(err, result){
                if (!err) {
                    res.send(result);
                }
            });
    }
};

let updateSuite = (req,res) => {
    if(typeof req.files[1]!='undefined'){
        request
            .put(apiHost+'/config/v1/namespace/'+req.body.nameSpaces+'/component/'+req.body.components+'/suite/'+req.body.suiteName)
            .field('suiteName', req.body.suiteName)
            .field('type', 'JMeter')
            .field('createdBy', req.body.createdBy)
            .attach('jmxFile', req.files[0].path)
            .attach('csvFile', req.files[1].path)
            .end(function(err, result){
                if (!err) {
                    console.log("aaya===============",result);
                    res.send(result);
                }else{
                    console.log("error if any===========",err);
                }
            });
    }else{
        request
            .put(apiHost+'/config/v1/namespace/'+req.body.nameSpaces+'/component/'+req.body.components+'/suite/'+req.body.suiteName)
            .field('type', 'JMeter')
            .field('createdBy', req.body.createdBy)
            .attach('jmxFile', req.files[0].path)
            .end(function(err, result){
                if (!err) {
                    res.send(result);
                }
            });
    }
};


router.post('/createsuite', multerUploader.array('doc'), (req ,res) => {
    creteSuite(req,res);
});

router.post('/updatesuite', multerUploader.array('doc'), (req ,res) => {
    updateSuite(req,res);
});

router.get('/namespace', (req ,res) => {
    getNamespaces(req,res)
});

router.get('/component/namespace/:namespace', (req ,res) => {
    getComponentsForNamespace(req,res)
});

router.get('/component/namespace/:namespace/:component', (req ,res) => {
    getSuites(req,res)
});

router.get('/deleteSuite/:namespace/:component/:suite', (req ,res) => {
    deleteSuites(req,res)
});
