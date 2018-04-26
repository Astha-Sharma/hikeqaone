import ExecuteSuiteConstants from '../../constants/rhaegal/executeSuiteConstants'
import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    executeSuiteStore: {
        suiteResponse:{},
        isLoading: true,
        executeResponse:{},
        flowStatus:0,
        runningSummary:{},
        testStatus: false,
    }
})

const ExecuteSuite = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case ExecuteSuiteConstants.GET_SUITE_FULFILLED:
            console.log("GET_SUITE_FULFILLED:")
             let data = JSON.parse(action.data.body.text);
             nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
             nextState = nextState.setIn(["executeSuiteStore", "suiteResponse"], data);
            break;
        case ExecuteSuiteConstants.GET_SUITE_PENDING:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], true);
            break;
        case ExecuteSuiteConstants.GET_SUITE_REJECT:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
            break;
        case ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED:
             nextState = state.setIn(["executeSuiteStore", "flowStatus"], Immutable.fromJS( action.flowStatus));
             nextState = nextState.setIn(["executeSuiteStore", "flowCurrent"], Immutable.fromJS( action.flowCurrent));
            break;
        case ExecuteSuiteConstants.STARTING_TEST_FULFILLED:
             console.log("STARTING_TEST_FULFILLED=========",action)
             nextState = state.setIn(["executeSuiteStore", "testStatus"], true);
             nextState = nextState.setIn(["executeSuiteStore", "flowCurrent"], Immutable.fromJS( action.flowCurrent));
             nextState = nextState.setIn(["executeSuiteStore", "flowStatus"], Immutable.fromJS( action.flowStatus));
             nextState = nextState.setIn(["executeSuiteStore", "executeResponse"], action.response);
            break;
        case ExecuteSuiteConstants.STOP_TEST_FULFILLED:
            nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
            nextState =  state.setIn(["executeSuiteStore", "testStatus"], false);
            nextState = nextState.setIn(["executeSuiteStore", "flowCurrent"], Immutable.fromJS( action.flowCurrent));
            nextState = nextState.setIn(["executeSuiteStore", "flowStatus"], Immutable.fromJS( action.flowStatus));
            nextState = nextState.setIn(["executeSuiteStore", "executeResponse"], {});
            console.log("STOP_TEST_FULFILLED =========",action)
            break;
        case ExecuteSuiteConstants.STOP_TEST_PENDING:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], true);
            break;
        case ExecuteSuiteConstants.STOP_TEST_REJECT:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
            break;
        case ExecuteSuiteConstants.RUNNINGTEST_SUMMARY_FULFILLED:
             nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
             nextState = nextState.setIn(["executeSuiteStore", "runningSummary"],action.runningSummary);
            break;
        case ExecuteSuiteConstants.RUNNINGTEST_SUMMARY_PENDING:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], true);
            break;
        case ExecuteSuiteConstants.RUNNINGTEST_SUMMARY_REJECT:
               nextState = state.setIn(["executeSuiteStore", "isLoading"], false);
            break;
        default:
            return state;
    }
    return nextState;
}

export default ExecuteSuite
