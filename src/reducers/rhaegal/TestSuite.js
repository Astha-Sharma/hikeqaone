import AddSuiteConstants from '../../constants/rhaegal/addSuiteConstants'
import Immutable from 'immutable';

let initTags = Immutable.fromJS({
    nameSpacesLabels: [],
    componentLabels: [],
    loading: false
})

const createTagLabel = function(resdata){
    let namespacesLabels = resdata.map((data)=>{
        //console.log("Print Namespaces #########", data)
        return {
            label: data.namespace,
            value: data.namespace
        }
    });
    return namespacesLabels;
}


const createTagLabelComponent = function(resdata){
    let namespacesLabels = resdata.map((data)=>{
        return {
            label: data,
            value: data
        }
    });
    return namespacesLabels;
}

const createTagLabelSuite = function(resdata){
    let suitesLabels = resdata.map((data)=>{
        return {
            label: data.suiteName,
            value: data.id
        }
    });
    return suitesLabels;
}

const TestSuite = (state = initTags, action) => {
    state = Immutable.Map.isMap(state) ? state : Immutable.fromJS(state);
    var nextState;
    switch (action.type) {
        case AddSuiteConstants.GET_NAMESPACE_FULFILLED:
            let resData = JSON.parse(action.data.body.text);
            let namespacesLabels = createTagLabel(resData.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("nameSpacesLabels", Immutable.fromJS(namespacesLabels));
            break;
        case AddSuiteConstants.GET_NAMESPACE_PENDING:
            nextState = state.set("loading", true);
            break;
        case AddSuiteConstants.GET_NAMESPACE_REJECT:
            nextState = state.set("loading", false);
            break;

        case AddSuiteConstants.GET_COMPONENT_FULFILLED:
            let response = JSON.parse(action.data.body.text);
            let componentLabels = createTagLabelComponent(response.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("componentLabels", Immutable.fromJS(componentLabels));
            break;
        case AddSuiteConstants.GET_COMPONENT_PENDING:
            nextState = state.set("loading", true);
            break;
        case AddSuiteConstants.GET_COMPONENT_REJECT:
            nextState = state.set("loading", false);
            break;

        case AddSuiteConstants.GET_SUITES_FULFILLED:
            let responseSuite = JSON.parse(action.data.body.text);
            let suiteLabels = createTagLabelSuite(responseSuite.data);
            nextState = state.set("loading", false);
            nextState = nextState.set("suiteLabels", Immutable.fromJS(suiteLabels));
            break;
        case AddSuiteConstants.GET_SUITES_PENDING:
            nextState = state.set("loading", true);
            break;
        case AddSuiteConstants.GET_SUITES_REJECT:
            nextState = state.set("loading", false);
            break;

        case AddSuiteConstants.CREATE_SUITE_FULFILLED:
            let status=JSON.parse(action.data.body.text);
            let newstatus=JSON.parse(JSON.stringify(status));
            nextState = state.set("loading", false);
            nextState = nextState.set("suiteCreationStatus",newstatus.status.statusType);
            break;
        case AddSuiteConstants.CREATE_SUITE_PENDING:
            nextState = state.set("loading", true);
            break;
        case AddSuiteConstants.CREATE_SUITE_REJECT:
            status=JSON.parse(action.data.body.text);
            newstatus=JSON.parse(JSON.stringify(status));
            nextState = nextState.set("suiteCreationStatus",newstatus.status.statusType);
            break;

        case AddSuiteConstants.UPDATE_SUITE_FULFILLED:
            status=JSON.parse(action.data.body.text);
            newstatus=JSON.parse(JSON.stringify(status));
            nextState = state.set("loading", false);
            nextState = nextState.set("suiteCreationStatus",newstatus.status.statusType);
            break;
        case AddSuiteConstants.UPDATE_SUITE_PENDING:
            nextState = state.set("loading", true);
            break;
        case AddSuiteConstants.UPDATE_SUITE_REJECT:
            status=JSON.parse(action.data.body.text);
            newstatus=JSON.parse(JSON.stringify(status));
            nextState = nextState.set("suiteCreationStatus",newstatus.status.statusType);
            break;
        default:
            return state;
    }
    return nextState;
}

export default TestSuite
