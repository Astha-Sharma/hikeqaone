"use strict";
var request=require('superagent');
var router = require('express').Router();
//const apiHost="http://13.229.91.88:6060";
const apiHost="http://localhost:3333";


module.exports = router;

router.get('/', [function(){
    console.log("In Path...")
}]);


let getSummary = (req,res) => {
    request
        .get(apiHost+'/v1/aggregator/'+req.params.environment+'/getsummary')
        .end(function(err, result){
            if (!err) {
                res.send(result);
            }else{
                console.log("error in castleblack getsummary",err)
            }
        });
};

router.get('/getsummary/:environment', (req ,res) => {
    getSummary(req,res);
});

