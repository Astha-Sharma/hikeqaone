import LeftNavConstants from '../constants/leftNavConstants'
import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    leftNavStore: {
        navResponse:{},
        isLoading: true
    }
})

const LeftNav = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case LeftNavConstants.GET_LEFTNAV_FULFILLED:
             let data = JSON.parse(action.data.body.text);
             nextState = state.setIn(["leftNavStore", "isLoading"], false);
             nextState = nextState.setIn(["leftNavStore", "navResponse"], data);
            break;
        case LeftNavConstants.GET_LEFTNAV_PENDING:
               nextState = state.setIn(["leftNavStore", "isLoading"], true);
            break;
        case LeftNavConstants.GET_LEFTNAV_REJECT:
               nextState = state.setIn(["leftNavStore", "isLoading"], false);
            break;
        default:
            return state;
    }
    return nextState;
}

export default LeftNav
