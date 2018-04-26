import HistoryConstants from "../../constants/rhaegal/historyConstants";
var Promise = require('es6-promise').Promise;


export const getAllRuns = (suiteId) => ({
    types: [
        HistoryConstants.GET_RUN_RESULTS_PENDING, HistoryConstants.GET_RUN_RESULTS_FULFILLED, HistoryConstants.GET_RUN_RESULTS_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/history/getAllRuns/'+suiteId)
});


export const getRunDetailsByRunId = (runId) => ({
    types: [
        HistoryConstants.GET_RUN_DETAILS_PENDING, HistoryConstants.GET_RUN_DETAILS_FULFILLED, HistoryConstants.GET_RUN_DETAILS_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/history/getRunDetailsByRunId/'+runId)
});