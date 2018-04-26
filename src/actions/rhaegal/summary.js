import SummaryConstants from "../../constants/rhaegal/summaryConstants";
var Promise = require('es6-promise').Promise;


export const getSummary = (runId) => ({
    types: [
        SummaryConstants.GET_SUMMARY_PENDING, SummaryConstants.GET_SUMMARY_FULFILLED, SummaryConstants.GET_SUMMARY_REJECT
    ],
    payload: (client) => client.post('/api/rhaegal/summary/getsummary', {data: {runId}})
});


export const getRunHistory = (runId) => ({
    types: [
        SummaryConstants.GET_RUNHISTORY_PENDING, SummaryConstants.GET_RUNHISTORY_FULFILLED, SummaryConstants.GET_RUNHISTORY_REJECT
    ],
    payload: (client) => client.post('/api/rhaegal/summary/getrundetails', {data: {runId}})
});

export const getStats = (runId) => ({
    types: [
        SummaryConstants.GET_STATS_PENDING, SummaryConstants.GET_STATS_FULFILLED, SummaryConstants.GET_STATS_REJECT
    ],
    payload: (client) => client.post('/api/rhaegal/summary/getstats', {data: {runId}})
});

export const getRunningInstances = () => ({
    types: [
        SummaryConstants.GET_RUNS_PENDING, SummaryConstants.GET_RUNS_FULFILLED, SummaryConstants.GET_RUNHISTORY_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/summary/getRunningInstances')
});
