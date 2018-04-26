import historyConstants from "../../constants/rhaegal/historyConstants";
import Immutable from 'immutable';


let initTags = Immutable.fromJS({
        isLoading: true,
        runListLabels: [],
        runDetails:{}
})

const createTagLabel = function(resdata){
    let runlistLabels = resdata.map((data)=>{
        return {
            label: data.date,
            value: data.runId
        }
    });
    return runlistLabels;
}


const History = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case historyConstants.GET_RUN_RESULTS_FULFILLED:
            let resData = JSON.parse(action.data.body.text);
            let runlistLabels = createTagLabel(resData.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("runListLabels", Immutable.fromJS(runlistLabels));
            break;
        case historyConstants.GET_RUN_RESULTS_PENDING:
            nextState = state.set("isLoading", true);
            break;
        case historyConstants.GET_RUN_RESULTS_REJECT:
            nextState = state.set("isLoading", false);
            break;

        case historyConstants.GET_RUN_DETAILS_FULFILLED:
            nextState = state.set("isLoading", false);
            nextState = nextState.set("runDetails", "");
            break;
        case historyConstants.GET_RUN_DETAILS_PENDING:
            nextState = state.set("isLoading", true);
            break;
        case historyConstants.GET_RUN_DETAILS_REJECT:
            nextState = state.set("isLoading", false);
            break;
        default:
            return state;
    }
    return nextState;
}

export default History

