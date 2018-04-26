"use strict";
var express = require('express');
var router = express.Router();
module.exports = router;
var renderDefault = require('./render-default');


router.get('*', [(req,res,next)=>{console.log("In Default...");next()},renderDefault()]);


