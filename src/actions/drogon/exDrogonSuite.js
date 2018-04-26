import ExDrogonSuiteConstants from '../../constants/drogon/exDrogonSuiteConstants';
import httpRequest from 'superagent';


var Promise = require('es6-promise').Promise;


export const getAllComponents = () => ({
    types: [
        ExDrogonSuiteConstants.GET_COMPONENT_PENDING, ExDrogonSuiteConstants.GET_COMPONENT_FULFILLED, ExDrogonSuiteConstants.GET_COMPONENT_REJECT
    ],
    payload: (client) => client.get('/api/drogon/exsuite/config/components')
});



export const getSuitesForComponent = (component) => ({
    types: [
        ExDrogonSuiteConstants.GET_SUITE_PENDING, ExDrogonSuiteConstants.GET_SUITE_FULFILLED, ExDrogonSuiteConstants.GET_SUITE_REJECT
    ],
    payload: (client) => client.get('/api/drogon/exsuite/config/component/'+component)
});


export const getSuitesDetails = (component,suiteId) => ({
    types: [
        ExDrogonSuiteConstants.GET_SUITE_DETAILS_PENDING, ExDrogonSuiteConstants.GET_SUITE_DETAILS_FULFILLED, ExDrogonSuiteConstants.GET_SUITE_DETAILS_REJECT
    ],
    payload: (client) => client.get('/api/drogon/exsuite/config/component/'+component+'/suite/'+suiteId)
});



export const stopLoadTest = (runid) => ({
    types: [
        ExDrogonSuiteConstants.STOP_DROGON_TEST_PENDING, ExDrogonSuiteConstants.STOP_DROGON_TEST_FULFILLED, ExDrogonSuiteConstants.STOP_DROGON_TEST_REJECT
    ],
    payload: (client) => client.post('/api/drogon/exsuite/ignite/hodor',{data: {runid} })
});




export const getHardwareAvailability = (reqPayload,dispatch) => {

    return new Promise(function(resolve, reject){
        httpRequest.post('/api/drogon/exsuite/ignite/checkavailability').send(reqPayload).then(function(res){
            let checkHardwareResponse = JSON.parse(res.body.text)
            if(checkHardwareResponse.status.statusType==="SUCCESS"){
                dispatch({type: ExDrogonSuiteConstants.GET_DROGON_HARDWARE_AVAILABILITY_PENDING, flowStatus: 'wait', flowCurrent: 0})
                resolve( checkHardwareResponse );
            } else {
                alert("Error While Checking Hardware Availablity"+ checkHardwareResponse);
                reject(checkHardwareResponse);
            }
        })
    })
        .then(function(checkHardwareResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/drogon/exsuite/ignite/startmachineinstances').send(checkHardwareResponse.data).then(function(res){
                    let startingInstanceResponse = JSON.parse(res.body.text);
                    if(startingInstanceResponse.status.statusType==="SUCCESS"){
                        dispatch({type: ExDrogonSuiteConstants.GET_DROGON_START_INSTANCES_FULFILLED , flowStatus: 'wait', flowCurrent: 1})
                        resolve(startingInstanceResponse);
                    } else {
                        alert("Error While Starting Instances"+ startingInstanceResponse);
                        reject(startingInstanceResponse);
                    }
                })
            });
        })
        .then(function(startingInstanceResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/drogon/exsuite/ignite/configure').send(startingInstanceResponse.data).then(function(res){
                    let provisioningResponse = JSON.parse(res.body.text);
                    if(provisioningResponse.status.statusType==="SUCCESS"){
                        dispatch({type: ExDrogonSuiteConstants.GET_DROGON_PROVISIONING_FULFILLED, flowStatus: 'wait', flowCurrent: 2})
                        resolve(provisioningResponse);
                    } else {
                        alert("Error While Provision Instances..."+ provisioningResponse);
                        reject(provisioningResponse);
                    }
                })
            });
        })
        .then(function(provisioningResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/drogon/exsuite/ignite/dracarys').send(provisioningResponse.data).then(function(res){
                    let executingResponse = JSON.parse(res.body.text);
                    if(executingResponse.status.statusType === "SUCCESS"){
                        dispatch({type: ExDrogonSuiteConstants.GET_DROGON_TEST_STARTED_FULFILLED, response: executingResponse, flowStatus: 'finish', flowCurrent: 3})
                        resolve(executingResponse);
                    } else {
                        console.log("Error....",executingResponse)
                        alert("Error While Starting Test...");
                        reject(executingResponse);
                    }
                })
            });
        })
        .catch(function(err){
            alert("Something Is Fishy !");
            console.error('Something Is Fishy ', err)
        })
};