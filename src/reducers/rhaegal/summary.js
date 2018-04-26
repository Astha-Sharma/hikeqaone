import summaryConstants from "../../constants/rhaegal/summaryConstants";
import Immutable from 'immutable';


let initTags = Immutable.fromJS({
    summaryStore: {
        isLoading: true,
        summary:{},
        runDetails:{},
        runStats:{},
        runStatus: {}
    }
})


const Summary = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case summaryConstants.GET_SUMMARY_FULFILLED:
            let data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            nextState = nextState.setIn(["summaryStore", "summary"], data);
            break;
        case summaryConstants.GET_SUMMARY_PENDING:
            nextState = state.setIn(["summaryStore", "isLoading"], true);
            break;
        case summaryConstants.GET_SUMMARY_REJECT:
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            break;

        case summaryConstants.GET_RUNHISTORY_FULFILLED:
            data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            nextState = nextState.setIn(["summaryStore", "runDetails"], data);
            break;
        case summaryConstants.GET_RUNHISTORY_PENDING:
            nextState = state.setIn(["summaryStore", "isLoading"], true);
            break;
        case summaryConstants.GET_RUNHISTORY_REJECT:
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            break;

        case summaryConstants.GET_STATS_FULFILLED:
             data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            nextState = nextState.setIn(["summaryStore", "runStats"], data);
            break;
        case summaryConstants.GET_STATS_PENDING:
            nextState = state.setIn(["summaryStore", "isLoading"], true);
            break;
        case summaryConstants.GET_STATS_REJECT:
            nextState = state.setIn(["summaryStore", "isLoading"], false);
            break;

        default:
            return state;
    }
    return nextState;
}

export default Summary

