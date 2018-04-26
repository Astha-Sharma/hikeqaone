console = require('debug-levels')('server');
require('log-timestamp')();
require('mkdirp')(__dirname + '/logs', (err)=>err ? "Could not create logs folder" : "Logs at: /logs");

var express = require('express'),
    _ = require('underscore'),
    bodyParser = require('body-parser'),
    exec = require('child_process').exec;
    app = express();
    app.set('views', __dirname+'/src/views');
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use('/healthcheck', (req, res) => {
        res.send('ok')
    });
    app.use('/version', (req, res) => {
        res.send(require('./package').version)
    });

    app.use(require('compression')());
    app.use('/app/static', express.static('public'));

    require('express-load-routes')(app, './src/routes');
    app.use('*',[require('./src/routes/default')]);


    // STARTING THE SERVER
    var port = (process.env.NODE_PORT || 9998);
    var server = require('http').createServer(app);
    server.timeout = 600000;
    server.on('error', function (err) {
        console.error('Server start failed: %s port: %s, env: %s, instance: %s, version: %s',
            err, port, app.get('env'), process.env.NODE_APP_INSTANCE, process.version);
        process.exit(1);
    })
    server.listen(port, function (err) {
        if (err) {
            console.error('Server start failed: %s port: %s, env: %s, instance: %s, version: %s',
                err, port, app.get('env'), process.env.NODE_APP_INSTANCE, process.version);
        } else {
            console.log('Server started successfully. port: %s, env: %s, instance: %s, version: %s',
                port, app.get('env'), process.env.NODE_APP_INSTANCE, process.version);
        }
    });


var io = require('socket.io')(server);
console.log("coming herer!!!!!!!!!!!!")
io.on('connection', function(socket) {
    console.log("connected via socket")
    socket.on('getExecuteLogs', function(resultObject){
        key = './data/admin.pem'
        //console.log("SSH Command ", 'ssh -o StrictHostKeyChecking=no -i ' + key + ' centos@'+resultObject.ip + ' tail' + ' -f ' +resultObject.path)
        tail = exec('ssh -o StrictHostKeyChecking=no -i ' + key + ' centos@'+resultObject.ip + ' tail' + ' -f ' +resultObject.path);
        tail.stdout.on('data', function (data) {
            var logs = data.toString().split('\n');
            for(var i = 0; i < logs.length; i++){
                if(logs[i].length > 0){
                    socket.emit('gotRunningLogs', logs[i]);
                }
            }
        });
        tail.stderr.on('data', function (data) {
            console.log('Error while getting running logs - ' +  data);
        });
        tail.on('close', function (code) {
            console.log('Closing Connection : ' + code);
        });
    });

    socket.on('getJMeterLog', function(resultObject){
        key = './data/admin.pem'
        //console.log("SSH Command ", 'ssh -o StrictHostKeyChecking=no -i ' + key + ' centos@'+resultObject.ip + ' tail' + ' -f ' +resultObject.path)
        tail = exec('ssh -o StrictHostKeyChecking=no -i ' + key + ' centos@'+resultObject.ip + ' tail' + ' -100f ' +resultObject.path);
        tail.stdout.on('data', function (data) {
            var logs = data.toString().split('\n');
            for(var i = 0; i < logs.length; i++){
                if(logs[i].length > 0){
                    socket.emit('gotJMeterLogs', logs[i]);
                }
            }
        });
        tail.stderr.on('data', function (data) {
            console.log('Error while getting running logs - ' +  data);
        });
        tail.on('close', function (code) {
            console.log('Closing Connection : ' + code);
        });
    });

});
