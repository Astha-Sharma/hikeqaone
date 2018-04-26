"use strict";

var _ = require('underscore');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var debug = require('debug')('service');
var isProdEnv = ['production'].indexOf(process.env.NODE_ENV) !== -1;
var defaultConfig = {
    root: '',
    path: '',
    timeout: isProdEnv ? 15000 : 300000
};

var env = process.env;
var win = (typeof window !== 'undefined' && typeof window.document !== 'undefined');
var logIt = false;
var cfg = {};

if (!win) {
    var logOpts = typeof env.NODE_SERVICE_LOG === 'string' ? env.NODE_SERVICE_LOG.split(',') : [];
    logIt = logOpts.length > 0;
    if (logIt) {
        cfg.all = logOpts.indexOf('all') != -1;
        cfg.all = cfg.all || logOpts.indexOf('full') != -1;
        cfg.err = cfg.all || logOpts.indexOf('err') != -1;
        cfg.reqfull = cfg.all || logOpts.indexOf('reqfull') != -1;
        cfg.resfull = cfg.all || logOpts.indexOf('resfull') != -1;
        cfg.req = cfg.all || cfg.reqfull || logOpts.indexOf('req') != -1;
        cfg.res = cfg.all || cfg.resfull || logOpts.indexOf('res') != -1;
        console.log('service logOpts %j %j', logOpts, cfg);
    }
}

var logRequest = (win ? function(){} : function(req, res, cfg) {
    var logs = [];
    if (logIt) logs.push('[servicelog]');
    if (cfg.req) {
        logs.push('<request>');
        logs.push(req.method.toUpperCase() + ' ' + req.url);
        logs.push(JSON.stringify(req.req._headers, null, 4));
    }
    if (cfg.reqfull && req._data) {
        var pdata = '';
        if (typeof req._data == 'string') {
            pdata = req._data;
        }
        else {
            try {
                pdata = JSON.stringify(req._data);
            } catch (ex) {
                pdata = req._data;
            }
        }
        logs.push(pdata);
    }
    if (cfg.req) logs.push('</request>');
    if (res && cfg.res) {
        logs.push('<response>');
        logs.push(res.statusCode);
        logs.push(JSON.stringify(res.headers, null, 4));
        if (cfg.resfull) {
            logs.push(res.text);
        }
        logs.push('</response>');
    }
    if (logIt) console.error(logs.join("\n"));
});

var logService = function(req) {
    var _end = req.end;
    req.end = function (fn) {
        _end.call(req, function (err, res) {
            var bd = (res && res.body);
            if (!err && res && res.error) {
                err = res.error;
            }
            // some apis use success flag. convert it to some generic error
            if (!err && res && res.success === false) {
                err = {error :'unknown error. api returned success:false without error message!'};
            }
            // dont log incase of a destroy called with error code MECONNRESET
            if ((cfg.err && err && err.code != 'MECONNRESET') ||
                (cfg.err && bd && bd.status && typeof bd.status.statusType != 'undefined' && bd.status.statusType != 'SUCCESS')) {
                logRequest(req, res, {all:true});
            } else {
                logRequest(req, res, cfg);
            }
            fn && fn(err, res);
        });
        return req;
    };

    return req;
}

function service(config) {
    if (!(this instanceof service)) {
        return new service(config);
    }

    if (typeof config == 'undefined') {
        this.config = _.extend({}, defaultConfig);
    }
    else if (typeof config == 'string') {
        this.config = _.extend({}, defaultConfig, {
            path: config
        });
    }
    else {
        this.config = _.extend({}, defaultConfig, config);
    }

    this.url = this.config.url || (this.config.root + this.config.path);

}

function methodize(proto, method) {
    proto[method] = function (uri) {
        var t = this;
        uri = uri || '';
        var req = request[method](this.url + uri);

        req.timeout(this.config.timeout);
        req.set('Accept', 'application/json');
        if (typeof window === 'object') {
            req.set('X-Requested-With', 'XMLHttpRequest');
        }
        req.set('Content-Type', 'application/json');
        if (this.config.auth) {
            req.set('Authorization', this.config.auth);
        }
        if (this.config.headers) {
            req.set(this.config.headers);
        }


        // shortcut to execute and handle the common errors
        req.exec = function() {
            return new Promise(function(resolve, reject) {
                req.end(function(err, response) {
                    return handleErrors(uri, err, response).then(resolve, reject);
                });
            });
        };

        debug('%s %s - %s', method.toUpperCase(), this.url + uri, this.config.timeout);
        return logService(req);
    };
    return proto;
}

var api = service.prototype;
var methods = [ 'get', 'post', 'put', 'head', 'del', 'options' ];
var gerr = 'Oops! something went wrong. Please try again later';

for (var i = 0; i < methods.length; i++) {
    methodize(api, methods[i]);
}

function handleErrors(name, err, resp) {
    name = '[service] ' + name + ' ';
    return new Promise(function(resolve, reject) {
        if (err) {
            if (err.timeout) {
                console.error(new Error(name + 'timed out').stack);
                reject('Error! service timed out');
            } else {
                console.error(new Error(name + 'failed with status: ' + err.status + ' code: ' + err.code).stack)
                reject('Error! service failed');
            }
        } else {
            var res = resp.body;
            // some services have a root node in the response (ex: userResponse). remove that node.
            var keys = Object.keys(res);
            if (/Response/.test(keys[0])) {
                // console.log('%s removed root node: %s', name, keys[0]);
                res = res[keys[0]];
            }
            if (res.error) {
             //   console.error(new Error(name + error).stack);
                reject(gerr);
            } else if (res.success === false) { // some services use this flag insteadof status
               // console.error(new Error(name + 'unknown error').stack);
                reject(gerr);
            } else if (!res.status) {
              //  console.error(new Error(name + 'response status missing').stack);
                reject(gerr);
            } else if (res.status.statusType !== 'SUCCESS') {
              //  console.error(new Error(name + res.status.statusMessage + ' code: ' + res.status.statusCode).stack);
                reject(res.status.statusMessage);
            } else {
                resolve(res);
            }
        }
    })
}

service.handleErrors = handleErrors;
module.exports = service;











// import superagent from 'superagent';
// import config from './config';
//
// const methods = ['get', 'post', 'put', 'patch', 'del'];
//
// function formatUrl(path) {
//     const adjustedPath = path[0] !== '/' ? '/' + path : path;
//     // if (__SERVER__) {
//     //     // Prepend host and port of the API server to the path.
//     //     return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
//     // }
//     // Prepend `/api` to relative URL, to proxy to API server.
//     return '/api' + adjustedPath;
// }
//
// export default class ApiClient {
//     constructor(req) {
//         methods.forEach((method) =>
//             this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
//                 const request = superagent[method](formatUrl(path));
//
//                 if (params) {
//                     request.query(params);
//                 }
//
//                 if (req.get('cookie')) {
//                     request.set('cookie', req.get('cookie'));
//                 }
//
//                 if (data) {
//                     request.send(data);
//                 }
//
//                 request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
//             }));
//     }
//     /*
//      * There's a V8 bug where, when using Babel, exporting classes with only
//      * constructors sometimes fails. Until it's patched, this is a solution to
//      * "ApiClient is not defined" from issue #14.
//      * https://github.com/erikras/react-redux-universal-hot-example/issues/14
//      *
//      * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
//      *
//      * Remove it at your own risk.
//      */
//     empty() {}
// }