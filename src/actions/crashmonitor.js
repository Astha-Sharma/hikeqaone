import crashconstants from "../constants/crashconstants";

export const getAndroidTrends = () => ({
    types: [
        crashconstants.GET_TRENDSANDROID_PENDING, crashconstants.GET_TRENDSANDROID_FULFILLED, crashconstants.GET_TRENDSANDROID_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/getandroidtrends')
});

export const getAndroidTrendsTop = () => ({
    types: [
        crashconstants.GET_TRENDSANDROIDTOP_PENDING, crashconstants.GET_TRENDSANDROIDTOP_FULFILLED, crashconstants.GET_TRENDSANDROIDTOP_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/getAndroidTrendsTopBuilds')
});

export const getIosTrends = () => ({
    types: [
        crashconstants.GET_TRENDSIOS_PENDING, crashconstants.GET_TRENDSIOS_FULFILLED, crashconstants.GET_TRENDSIOS_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/getiostrends')
});
