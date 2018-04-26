import ExecuteSuiteConstants from '../../constants/rhaegal/executeSuiteConstants';
import httpRequest from 'superagent';


var Promise = require('es6-promise').Promise;

export const getSuiteDetails = (namespaceName, componentName, suiteName) => ({
    types: [
        ExecuteSuiteConstants.GET_SUITE_PENDING, ExecuteSuiteConstants.GET_SUITE_FULFILLED, ExecuteSuiteConstants.GET_SUITE_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/execute/getsuitedetails/'+namespaceName+"/"+componentName+"/"+suiteName)
});


export const stopCurrentTest = (runid) => ({
    types: [
        ExecuteSuiteConstants.STOP_TEST_PENDING, ExecuteSuiteConstants.STOP_TEST_FULFILLED, ExecuteSuiteConstants.STOP_TEST_REJECT
    ],
    payload: (client) => client.post('/api/rhaegal/execute/stopcurrentsuite',{data: {runid} })
});




export const getHardwareAvailability = (reqPayload,dispatch) => {

    return new Promise(function(resolve, reject){
        httpRequest.post('/api/rhaegal/execute/checkavailability').send(reqPayload).then(function(res){
            let checkHardwareResponse = JSON.parse(res.body.text)
            if(checkHardwareResponse.status.statusType==="SUCCESS"){
                dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'wait', flowCurrent: 1})
                resolve( checkHardwareResponse );
            } else {
                dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'error', flowCurrent: 1})
                //alert("Error While Checking Hardware Availablity", checkHardwareResponse);
                reject(checkHardwareResponse);
            }
        })
    })

        .then(function(checkHardwareResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/rhaegal/execute/startinstances').send(checkHardwareResponse.data).then(function(res){
                    let startingInstanceResponse = JSON.parse(res.body.text);
                    if(startingInstanceResponse.status.statusType==="SUCCESS"){
                        dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'wait', flowCurrent: 2})
                        resolve(startingInstanceResponse);
                    } else {
                        alert("Error While Starting Instances", startingInstanceResponse);
                        dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'error', flowCurrent: 2})
                        reject(startingInstanceResponse);
                    }
                })
            });
        })
        .then(function(startingInstanceResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/rhaegal/execute/provisioning').send(startingInstanceResponse.data).then(function(res){
                    let provisioningResponse = JSON.parse(res.body.text);
                    if(provisioningResponse.status.statusType==="SUCCESS"){
                        dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'wait', flowCurrent: 3})
                        resolve(provisioningResponse);
                    } else {
                        dispatch({type: ExecuteSuiteConstants.CHECK_EXECUTING_FULFILLED, flowStatus: 'error', flowCurrent: 3})
                        alert("Error While Provision Instances...", provisioningResponse);
                        reject(provisioningResponse);
                    }
                })
            });
        })
        .then(function(provisioningResponse){
            return new Promise( function(resolve, reject){
                httpRequest.post('/api/rhaegal/execute/starttheshow').send(provisioningResponse.data).then(function(res){
                    let executingResponse = JSON.parse(res.body.text);
                    if(executingResponse.status.statusType === "SUCCESS"){
                        dispatch({type: ExecuteSuiteConstants.STARTING_TEST_FULFILLED, response: executingResponse ,flowStatus: 'finish', flowCurrent: 4})
                        resolve(executingResponse);
                    } else {
                        dispatch({type: ExecuteSuiteConstants.STARTING_TEST_FULFILLED, response: executingResponse ,flowStatus: 'error', flowCurrent: 4})
                        alert("Error While Starting Test...");
                        reject(executingResponse);
                    }
                })
            });
        })
        .catch(function(err){
            alert("Error Running Suite !", err.status.devErrorMessage);
            //console.error('Error Running Suite', err)
            return err
        })
};