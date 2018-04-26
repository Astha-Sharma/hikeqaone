import LeftNavConstants from '../constants/leftNavConstants';
var Promise = require('es6-promise').Promise;


export const getLeftNav = () => ({
    types: [
        LeftNavConstants.GET_LEFTNAV_PENDING, LeftNavConstants.GET_LEFTNAV_FULFILLED, LeftNavConstants.GET_LEFTNAV_REJECT
    ],
    payload: (client) => client.get('/api/leftnav/getleftnav')
});
