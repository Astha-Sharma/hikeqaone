import shadowtowerConstants from "../constants/shadowtowerConstants";
var Promise = require('es6-promise').Promise;


export const getSuite = () => ({
    types: [
        shadowtowerConstants.GET_SHADOWTOWERSUITES_PENDING, shadowtowerConstants.GET_SHADOWTOWERSUITES_FULFILLED, shadowtowerConstants.GET_SHADOWTOWERSUITES_REJECT
    ],
    payload: (client) => client.get('/api/shadowtower/getsuites')
});


export const getRuns = (runId) => ({
    types: [
        shadowtowerConstants.GET_SHADOWTOWERRUNS_PENDING, shadowtowerConstants.GET_SHADOWTOWERRUNS_FULFILLED, shadowtowerConstants.GET_SHADOWTOWERRUNS_REJECT
    ],
    payload: (client) => client.get('/api/shadowtower/getruns/'+runId+'/runs', {data: {runId}})
});

export const getTests = (runId) => ({
    types: [
        shadowtowerConstants.GET_SHADOWTOWERTESTS_PENDING, shadowtowerConstants.GET_SHADOWTOWERTESTS_FULFILLED, shadowtowerConstants.GET_SHADOWTOWERTESTS_REJECT
    ],
    payload: (client) => client.get('/api/shadowtower/gettests/'+runId+'/runs', {data: {runId}})
});
