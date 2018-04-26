"use strict";
var request=require('superagent');
var router = require('express').Router();
var multer = require("multer");
var fs = require('fs');
//const apiHost="http://13.229.91.88:6060";
const apiHost="http://localhost:6060";
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


let getLeftNav = (req,res) => {
    request('GET', apiHost+'/config/v1/nav/getLeftNav').end(function (err, result) {
        if(!err){
            res.send(result)
        }

    });
};


router.get('/getleftnav', (req ,res) => {
    getLeftNav(req,res)
});
