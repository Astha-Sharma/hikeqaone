import mqttconstants from "../constants/mqttConstants";

export const getResults = () => ({
    types: [
        mqttconstants.GET_MQTTRESULT_PENDING, mqttconstants.GET_MQTTRESULT_FULFILLED, mqttconstants.GET_MQTTRESULT_REJECT
    ],
    payload: (client) => client.get('/api/mqtt/getresults')
});

export const getResults24Hours = () => ({
    types: [
        mqttconstants.GET_MQTTRESP24H_PENDING, mqttconstants.GET_MQTTRESP24H_FULFILLED, mqttconstants.GET_MQTTRESP24H_REJECT
    ],
    payload: (client) => client.get('/api/mqtt/getresults24hours')
});

export const getResponseDist = () => ({
    types: [
        mqttconstants.GET_MQTTRESP_PENDING, mqttconstants.GET_MQTTRESP_FULFILLED, mqttconstants.GET_MQTTRESP_REJECT
    ],
    payload: (client) => client.get('/api/mqtt/getresponsedist')
});

export const getCardData = () => ({
    types: [
        mqttconstants.GET_CARDDATA_PENDING, mqttconstants.GET_CARDDATA_FULFILLED, mqttconstants.GET_CARDDATA_REJECT
    ],
    payload: (client) => client.get('/api/mqtt/getcarddata')
});