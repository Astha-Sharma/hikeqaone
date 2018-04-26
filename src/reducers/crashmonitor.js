import crashconstants from "../constants/crashconstants";
import Immutable from 'immutable';


let initTags = Immutable.fromJS({
    crashStore: {
        isLoading: true,
        trends:[],
        trendsTop:[],
        trendsIos:[]
    }
})


const Crash = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case crashconstants.GET_TRENDSANDROID_FULFILLED:
            let data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["crashStore", "isLoading"], false);
            nextState = nextState.setIn(["crashStore", "trends"], data);
            break;
        case crashconstants.GET_TRENDSANDROID_PENDING:
            nextState = state.setIn(["crashStore", "isLoading"], true);
            break;
        case crashconstants.GET_TRENDSANDROID_REJECT:
            nextState = state.setIn(["crashStore", "isLoading"], false);
            break;

        case crashconstants.GET_TRENDSANDROIDTOP_FULFILLED:
            let dataTop = JSON.parse(action.data.body.text);
            nextState = state.setIn(["crashStore", "isLoading"], false);
            nextState = nextState.setIn(["crashStore", "trendsTop"], dataTop);
            break;
        case crashconstants.GET_TRENDSANDROIDTOP_PENDING:
            nextState = state.setIn(["crashStore", "isLoadingTop"], true);
            break;
        case crashconstants.GET_TRENDSANDROIDTOP_REJECT:
            nextState = state.setIn(["crashStore", "isLoadingTop"], false);
            break;

        case crashconstants.GET_TRENDSIOS_FULFILLED:
            let dataIos = JSON.parse(action.data.body.text);
            nextState = state.setIn(["crashStore", "isLoading"], false);
            nextState = nextState.setIn(["crashStore", "trendsIos"], dataIos);
            break;
        case crashconstants.GET_TRENDSIOS_PENDING:
            nextState = state.setIn(["crashStore", "isLoadingTop"], true);
            break;
        case crashconstants.GET_TRENDSIOS_REJECT:
            nextState = state.setIn(["crashStore", "isLoadingTop"], false);
            break;

        default:
            return state;
    }
    return nextState;
}

export default Crash

