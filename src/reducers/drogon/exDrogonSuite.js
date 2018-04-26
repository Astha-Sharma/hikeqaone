import ExDrogonSuiteConstants from '../../constants/drogon/exDrogonSuiteConstants'
import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    componentLabels: [],
    loading: false,
    suitesLabels:[],
    suiteDetails:{},
    executeSuiteResponse:{},
    flowStatus:"wait",
    flowCurrent:0,
})

const createTagLabelComponent = function(resdata){
    let namespacesLabels = resdata.map((data)=>{
        return {
            label: data.component,
            value: data.component
        }
    });
    return namespacesLabels;
}



const createSuiteTagLabelComponent = function(resdata){
    let suiteLabels = resdata.map((data)=>{
        return {
            label: data.suite,
            value: data.id
        }
    });
    return suiteLabels;
}

const ExDrogonSuite = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case ExDrogonSuiteConstants.GET_COMPONENT_FULFILLED:
            let response = JSON.parse(action.data.body.text);
            let componentLabels = createTagLabelComponent(response.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("componentLabels", Immutable.fromJS(componentLabels));
            break;
        case ExDrogonSuiteConstants.GET_COMPONENT_PENDING:
        case ExDrogonSuiteConstants.STOP_DROGON_TEST_PENDING:
            nextState = state.set("loading", true);
            break;
        case ExDrogonSuiteConstants.GET_COMPONENT_REJECT:
        case ExDrogonSuiteConstants.STOP_DROGON_TEST_REJECT:
            nextState = state.set("loading", false);
            break;
        case ExDrogonSuiteConstants.GET_SUITE_FULFILLED:
            let resp = JSON.parse(action.data.body.text);
            let suitesLabels = createSuiteTagLabelComponent(resp.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("suitesLabels", Immutable.fromJS(suitesLabels));
            break;
        case ExDrogonSuiteConstants.GET_SUITE_PENDING:
            nextState = state.set("loading", true);
            break;
        case ExDrogonSuiteConstants.GET_SUITE_REJECT:
            nextState = state.set("loading", false);
            break;
        case ExDrogonSuiteConstants.GET_SUITE_DETAILS_FULFILLED:
            let res = JSON.parse(action.data.body.text);
            nextState = state.set("loading", false);
            nextState = nextState.set("suiteDetails", Immutable.fromJS(res));
            break;
        case ExDrogonSuiteConstants.GET_SUITE_DETAILS_PENDING:
            nextState = state.set("loading", true);
            break;
        case ExDrogonSuiteConstants.GET_SUITE_DETAILS_REJECT:
            nextState = state.set("loading", false);
            break;
        case ExDrogonSuiteConstants.GET_DROGON_HARDWARE_AVAILABILITY_FULFILLED:
            console.log("GET_DROGON_HARDWARE_AVAILABILITY_FULFILLED=========",action);
            nextState = state.set("loading", false);
            nextState = nextState.set("executeSuiteResponse", Immutable.fromJS( action.response));
            nextState = nextState.set("flowStatus", Immutable.fromJS( action.flowStatus));
            nextState = nextState.set("flowCurrent", Immutable.fromJS( action.flowCurrent));
            break;
        case ExDrogonSuiteConstants.GET_DROGON_START_INSTANCES_FULFILLED:
            console.log("GET_DROGON_START_INSTANCES_FULFILLED=========",action);
            nextState = state.set("loading", false);
            nextState = nextState.set("executeSuiteResponse", Immutable.fromJS( action.response));
            nextState = nextState.set("flowStatus", Immutable.fromJS( action.flowStatus));
            nextState = nextState.set("flowCurrent", Immutable.fromJS( action.flowCurrent));
            break;
        case ExDrogonSuiteConstants.GET_DROGON_PROVISIONING_FULFILLED:
            console.log("GET_DROGON_PROVISIONING_FULFILLED=========",action);
            nextState = state.set("loading", false);
            nextState = nextState.set("executeSuiteResponse", Immutable.fromJS( action.response));
            nextState = nextState.set("flowStatus", Immutable.fromJS( action.flowStatus));
            nextState = nextState.set("flowCurrent", Immutable.fromJS( action.flowCurrent));
            break;
        case ExDrogonSuiteConstants.GET_DROGON_TEST_STARTED_FULFILLED:
            console.log("GET_DROGON_TEST_STARTED_FULFILLED=========",action);
            nextState = state.set("loading", false);
            nextState = nextState.set("executeSuiteResponse", Immutable.fromJS( action.response));
            nextState = nextState.set("flowStatus", Immutable.fromJS( action.flowStatus));
            nextState = nextState.set("flowCurrent", Immutable.fromJS( action.flowCurrent));
            break;
        case ExDrogonSuiteConstants.STOP_DROGON_TEST_FULFILLED:
            console.log("STOP_DROGON_TEST_PENDING=========",action);
            nextState = state.set("loading", false);
            nextState = nextState.set("executeSuiteResponse", {});
            nextState = nextState.set("flowStatus", "wait");
            nextState = nextState.set("flowCurrent", 0);
            break;
        default:
            //console.log("In Default Suite=========",action)
            return state;
    }
    return nextState;
}

export default ExDrogonSuite
