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

export const getAllAndroidVersion = () => ({
    types: [
        crashconstants.GET_ANDROIDVERSION_PENDING, crashconstants.GET_ANDROIDVERSION_FULFILLED, crashconstants.GET_ANDROIDVERSION_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/getallandroidversion')
});

export const getAndroidCrashSummaryByVersion = (version) => ({
    types: [
        crashconstants.GET_ANDROID_CRASH_SUMMARY_BY_VERSION_PENDING, crashconstants.GET_ANDROID_CRASH_SUMMARY_BY_VERSION_FULFILLED, crashconstants.GET_ANDROID_CRASH_SUMMARY_BY_VERSION_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/androidcrashbyversion/'+version)
});

export const getMicroAppsCrashDetails = () => ({
    types: [
        crashconstants.GET_MICROAPPS_PENDING, crashconstants.GET_MICROAPPS_FULFILLED, crashconstants.GET_MICROAPPS_REJECT
    ],
    payload: (client) => client.get('/api/crashmonitor/microappcrashes/')
});

export const createJira = (payload) => ({
    types: [
        crashconstants.GET_CREATEJIRA_PENDING, crashconstants.GET_CREATEJIRA_FULFILLED, crashconstants.GET_CREATEJIRA_REJECT
    ],
    payload: (client) => client.post('/api/crashmonitor/createjira', payload)
});
