import DepictSummaryConstants from '../../constants/drogon/depictSummaryConstants'

import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    loading: false,
    depictRunningSummaryResponse:{},
    depictRunningDetailsResponse:{},
})

const DrogonDepictSummary = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_FULFILLED:
            let response = JSON.parse(action.data.body.text);
            nextState = state.set("loading", false);
            nextState = nextState.set("depictRunningDetailsResponse", Immutable.fromJS(response));
            break;
        case DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_FULFILLED:
            let summaryresponse = JSON.parse(action.data.body.text);
            nextState = state.set("loading", false);
            nextState = nextState.set("depictRunningSummaryResponse", Immutable.fromJS(summaryresponse));
            break;
        case DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_PENDING:
        case DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_PENDING:
            nextState = state.set("loading", true);
            break;
        case DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_REJECT:
        case DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_REJECT:
            nextState = state.set("loading", false);
            break;
        default:
            //console.log("In Default Suite=========",action)
            return state;
    }
    return nextState;
}

export default DrogonDepictSummary
