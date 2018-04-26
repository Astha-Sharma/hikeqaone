
var MyService = require('./myservice');

export default class ApiClient {
    constructor(req) {
        ['get', 'post', 'put', 'patch', 'del'].
        forEach((method) => {
            this[method] = (path, options) => (new Promise((resolve, reject) => {
                let apiService = (options && options.config) ? MyService(options.config) : MyService();
                let request = apiService[method](path);
                //For Query strings in the url
                if (options && options.params) {
                    request.query(options.params);
                }
                //For posts
                if (options && options.data) {
                    request.send(options.data);
                }
                request.end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }));
        });
    }
}
