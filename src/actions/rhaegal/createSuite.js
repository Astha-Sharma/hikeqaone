import AddSuiteConstants from '../../constants/rhaegal/addSuiteConstants';
import httpRequest from 'superagent';
var Promise = require('es6-promise').Promise;


export const getAllNameSpaces = () => ({
    types: [
        AddSuiteConstants.GET_NAMESPACE_PENDING, AddSuiteConstants.GET_NAMESPACE_FULFILLED, AddSuiteConstants.GET_NAMESPACE_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/suite/namespace')
});

export const getComponentsForNameSpace = (namespace) => ({
    types: [
        AddSuiteConstants.GET_COMPONENT_PENDING, AddSuiteConstants.GET_COMPONENT_FULFILLED, AddSuiteConstants.GET_COMPONENT_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/suite/component/namespace/'+namespace)
});

export const getSuitesDetails = (namespace, component) => ({
    types: [
        AddSuiteConstants.GET_SUITES_PENDING, AddSuiteConstants.GET_SUITES_FULFILLED, AddSuiteConstants.GET_SUITES_REJECT
    ],
    payload: (client) => client.get('/api/rhaegal/suite/component/namespace/'+namespace+'/'+component)
});


export const createTestSuite = (payload) => {
    console.log("request  ====payload=====", payload)
    const request = httpRequest.post('/api/rhaegal/suite/createsuite')
    .field('suiteName', payload.suiteName)
    .field('nameSpaces', payload.nameSpaces)
    .field('createdBy', payload.createdBy)
    .field('components', payload.components)
    .attach('doc', payload.jmxFile, payload.jmxFile.name)
    .attach('doc', payload.csvFile, payload.csvFile? payload.csvFile.name:"NA");
    //console.log("request  ====rew=====",request);
    return ({
      types: [
          AddSuiteConstants.CREATE_SUITE_PENDING, AddSuiteConstants.CREATE_SUITE_FULFILLED, AddSuiteConstants.CREATE_SUITE_REJECT
      ],
      payload: (client) => request
    })
};


export const deleteTestSuite = (namespace, component, suite) => {
    //console.log("request  ====payload=====", namespace, component, suite)
    return ({
        types: [
            AddSuiteConstants.DELETE_SUITE_PENDING, AddSuiteConstants.DELETE_SUITE_FULFILLED, AddSuiteConstants.DELETE_SUITE_FULFILLED
        ],
        payload: (client) => client.get('/api/rhaegal/suite/deleteSuite/'+namespace+'/'+component+'/'+suite)
    })
};

export const updateTestSuite = (payload) => {
    console.log("request  ====payload=====", payload)
    const request = httpRequest.post('/api/rhaegal/suite/updatesuite')
        .field('suiteName', payload.suiteName)
        .field('nameSpaces', payload.nameSpaces)
        .field('createdBy', payload.createdBy)
        .field('components', payload.components)
        .attach('doc', payload.jmxFile, payload.jmxFile.name)
        .attach('doc', payload.csvFile, payload.csvFile? payload.csvFile.name:"NA");
    //console.log("request  ====rew=====",request);
    return ({
        types: [
            AddSuiteConstants.UPDATE_SUITE_PENDING, AddSuiteConstants.UPDATE_SUITE_FULFILLED, AddSuiteConstants.UPDATE_SUITE_FULFILLED
        ],
        payload: (client) => request
    })
};

function errorHandler(name, err, resp) {
  return new Promise((resolve, reject) => {
      console.log(name, err, resp);
      if(err) {
        reject(err);
      }else {
        resolve(resp)
      }
  })

}
