import CastleBlackConstants from '../constants/castleBlackConstants'
import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    castleBlackStore: {
        summary:{},
        isLoading: true
    }
})

const CastleBlack = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case CastleBlackConstants.GET__SUMMARY_FULFILLED:
             let data = JSON.parse(action.data.body.text);
             nextState = state.setIn(["leftNavStore", "isLoading"], false);
             nextState = nextState.setIn(["castleBlackStore", "summary"], data);
            break;
        case CastleBlackConstants.GET__SUMMARY_REJECT:
               nextState = state.setIn(["castleBlackStore", "isLoading"], true);
            break;
        case CastleBlackConstants.GET_SUMMARY_PENDING:
               nextState = state.setIn(["castleBlackStore", "isLoading"], false);
            break;
        default:
            return state;
    }
    return nextState;
}

export default CastleBlack
