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
	console.log("In Path...")
}]);


let getSuiteDetails = (req,res) => {
	request('GET', apiHost+'/config/v1/namespace/'+req.params.nameSpaceName+'/component/'+req.params.componentName+'/suite/'+req.params.suiteName).end(function (err, result) {
		if(!err){
			res.send(result)
		}

	});
};
router.get('/getsuitedetails/:nameSpaceName/:componentName/:suiteName', (req ,res) => {
	getSuiteDetails(req,res)
});




let checkAvailability = (req,res) => {
	request
  .post(apiHost+'/exec/v1/checkMachineAvailability')
  .send(JSON.stringify(req.body))
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

let startingInstances = (req,res) => {
	request
	.post(apiHost+'/exec/v1/startMachineInstances')
  .send(JSON.stringify(req.body))
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

let checkProvisioning = (req,res) => {
	request
	.post(apiHost+'/exec/v1/configureLoad')
  .send(JSON.stringify(req.body))
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

let startTheShow = (req,res) => {
	request
	.post(apiHost+'/exec/v1/startTheShow')
  .send(JSON.stringify(req.body))
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

let stopCurrentSuite = (req,res) => {
	request
	.post(apiHost+'/exec/v1/stopTheShow')
  .send(JSON.stringify(req.body))
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

let readConsoleOutPut = (req,res) => {
	request
	.post(apiHost+'/reporter/readConsoleOutPut')
  .send(JSON.stringify(req.body))
  //.send({"status":"SUCCESS","masterIP":"54.82.108.124","runid":"m_8z5fnrbj8f4zh6ej9oz4","outputdir":"/home/sysadmin","jtlfilename":"m_8z5fnrbj8f4zh6ej9oz4.jtl","console":"m_8z5fnrbj8f4zh6ej9oz4_console.out","slavecount":1})
	.end(function(err, result){
     if (!err) {
			  res.send(result);
     }
   });
};

router.post('/startinstances', (req ,res) => {
  	startingInstances(req,res);
});

router.post('/checkavailability', (req ,res) => {
  	checkAvailability(req,res);
});

router.post('/provisioning', (req ,res) => {
  	checkProvisioning(req,res);
});

router.post('/starttheshow', (req ,res) => {
  	startTheShow(req,res);
});

router.post('/stopcurrentsuite', (req ,res) => {
  	stopCurrentSuite(req,res);
});

router.post('/readconsoleoutput', (req ,res) => {
  	readConsoleOutPut(req,res);
});
