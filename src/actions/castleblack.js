import CastleBlackConstants from '../constants/castleBlackConstants';



export const getAggSummary = (environment) => ({
    types: [
        CastleBlackConstants.GET_SUMMARY_PENDING, CastleBlackConstants.GET__SUMMARY_FULFILLED, CastleBlackConstants.GET__SUMMARY_REJECT
    ],
    payload: (client) => client.get('/api/castleblack/getsummary/'+environment)
});

