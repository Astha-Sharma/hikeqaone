"use strict";
var request=require('superagent');
var router = require('express').Router();
//const apiHost="http://54.255.225.152:6060";
const apiHost="http://localhost:5555";


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);


let getComponents = (req,res) => {
    request('GET', apiHost+'/config/v1/component').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};


let getSuitesForComponent = (req,res) => {
    request('GET',  apiHost+'/config/v1/component/'+req.params.component).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};


let getSuitesDetails = (req,res) => {
    request('GET',  apiHost+'/config/v1/component/'+req.params.component+'/suite/'+req.params.suiteId).end(function (err, result) {
        if(!err){
            res.send(result)
        }
    });
};



let checkAvailability = (req,res) => {
    request
        .post(apiHost+'/ignite/v1/check/machineavailability')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};


let startmachineInstances = (req,res) => {
    request
        .post(apiHost+'/ignite/v1/startmachineinstances')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

let configure = (req,res) => {
    request
        .post(apiHost+'/ignite/v1/configure')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

let dracarys = (req,res) => {
    request
        .post(apiHost+'/ignite/v1/dracarys')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};

let hordor = (req,res) => {
    request
        .post(apiHost+'/ignite/v1/hodor')
        .send(JSON.stringify(req.body))
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }
        });
};




router.get('/config/components', (req ,res) => {
    getComponents(req,res)
});


router.get('/config/component/:component', (req ,res) => {
    getSuitesForComponent(req,res)
});


router.get('/config/component/:component/suite/:suiteId', (req ,res) => {
    getSuitesDetails(req,res)
});


router.post('/ignite/checkavailability', (req ,res) => {
    checkAvailability(req,res);
});


router.post('/ignite/startmachineinstances', (req ,res) => {
    startmachineInstances(req,res);
});


router.post('/ignite/configure', (req ,res) => {
    configure(req,res);
});

router.post('/ignite/dracarys', (req ,res) => {
    dracarys(req,res);
});

router.post('/ignite/hodor', (req ,res) => {
    hordor(req,res);
});
