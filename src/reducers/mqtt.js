import mqttConstants from "../constants/mqttConstants";
import Immutable from 'immutable';


let initTags = Immutable.fromJS({
    mqttStore: {
        isLoading: true,
        isLoadingR: true,
        suitedata:[]
    }
})


const Mqtt = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case mqttConstants.GET_MQTTRESULT_FULFILLED:
            let data = JSON.parse(action.data.body.text);
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            nextState = nextState.setIn(["mqttStore", "suitedata"], data);
            console.log("state============",state);
            break;
        case mqttConstants.GET_MQTTRESULT_PENDING:
            nextState = state.setIn(["mqttStore", "isLoading"], true);
            break;
        case mqttConstants.GET_MQTTRESULT_REJECT:
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            break;

        case mqttConstants.GET_MQTTRESP_FULFILLED:
            let dataResp = JSON.parse(action.data.body.text);
            nextState = state.setIn(["mqttStore", "isLoadingR"], false);
            nextState = nextState.setIn(["mqttStore", "respdata"], dataResp);
            console.log("state============",state);
            break;
        case mqttConstants.GET_MQTTRESP_PENDING:
            nextState = state.setIn(["mqttStore", "isLoadingR"], true);
            break;
        case mqttConstants.GET_MQTTRESP_REJECT:
            nextState = state.setIn(["mqttStore", "isLoadingR"], false);
            break;

        case mqttConstants.GET_MQTTRESP24H_FULFILLED:
            let respdata24hours = JSON.parse(action.data.body.text);
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            nextState = nextState.setIn(["mqttStore", "respdata24hours"], respdata24hours);
            console.log("state============",state);
            break;
        case mqttConstants.GET_MQTTRESP24H_PENDING:
            nextState = state.setIn(["mqttStore", "isLoading"], true);
            break;
        case mqttConstants.GET_MQTTRESP24H_REJECT:
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            break;

        case mqttConstants.GET_CARDDATA_FULFILLED:
            let carddata = JSON.parse(action.data.body.text);
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            nextState = nextState.setIn(["mqttStore", "carddata"], carddata);
            break;
        case mqttConstants.GET_CARDDATA_PENDING:
            nextState = state.setIn(["mqttStore", "isLoading"], true);
            break;
        case mqttConstants.GET_CARDDATA_REJECT:
            nextState = state.setIn(["mqttStore", "isLoading"], false);
            break;
        default:
            return state;
    }
    return nextState;
}

export default Mqtt

