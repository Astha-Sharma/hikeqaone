"use strict";

module.exports = function(options) {

    return function (req, res, next) {
        res.render('index', {
            title: 'Welcome'
        });
    }
};
