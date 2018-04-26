import shadowTowerConstants from "../constants/shadowtowerConstants";
import Immutable from 'immutable';


let initTags = Immutable.fromJS({
    shadowTowerStore: {
        isLoading: true,
        suitedata:[],
        rundata:[],
        testsdata:[]
    }
})


const ShadowTower = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case shadowTowerConstants.GET_SHADOWTOWERSUITES_FULFILLED:
            let data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            nextState = nextState.setIn(["shadowTowerStore", "suitedata"], data);
            console.log("state============",state);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERSUITES_PENDING:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], true);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERSUITES_REJECT:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            break;

        case shadowTowerConstants.GET_SHADOWTOWERRUNS_FULFILLED:
            let resdata = JSON.parse(action.data.body.text);
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            nextState = nextState.setIn(["shadowTowerStore", "rundata"], resdata);
            console.log("state============",state);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERRUNS_PENDING:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], true);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERRUNS_REJECT:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            break;

        case shadowTowerConstants.GET_SHADOWTOWERTESTS_FULFILLED:
            let tesdata = JSON.parse(action.data.body.text);
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            nextState = nextState.setIn(["shadowTowerStore", "testsdata"], tesdata);
            console.log("state============",state);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERTESTS_PENDING:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], true);
            break;
        case shadowTowerConstants.GET_SHADOWTOWERTESTS_REJECT:
            nextState = state.setIn(["shadowTowerStore", "isLoading"], false);
            break;

        default:
            return state;
    }
    return nextState;
}

export default ShadowTower

