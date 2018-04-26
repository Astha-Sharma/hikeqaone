import DepictSummaryConstants from "../../constants/drogon/depictSummaryConstants";


export const getRunningSummary = (runId) => ({
    types: [
        DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_PENDING, DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_FULFILLED, DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_REJECT
    ],
    payload: (client) => client.post('/api/drogon/depictsummary/running/summary', {data: {runId}})
});


export const getRunningDetails = (runId) => ({
    types: [
        DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_PENDING, DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_FULFILLED, DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_REJECT
    ],
    payload: (client) => client.post('/api/drogon/depictsummary/running/details', {data: {runId}})
});

