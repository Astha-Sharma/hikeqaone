const urls = [
    {
        items: [

            /*
            {
                url: '/rhaegal',
                icon: 'fa fa-rocket',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: ''
                },
                title: 'Rhaegal',
                items:
                    [
                        {url: '//qa-gotinflux.swiggyops.de:3000/dashboard/db/enginehealth?orgId=1', icon: 'fa fa-stethoscope',title: 'Engines Health',items: []},
                        {url: '/rhaegal/addSuite', icon: 'fa fa-plus',title: 'Create Your Test',items: []},
                        {url: '/rhaegal/execute', icon: 'fa fa-play',title: 'Execute Suite',items: []},
                        {url: '/rhaegal/history', icon: 'fa fa-pie-chart',title: 'Result History',items: []}
                    ]
            },
            {
                url: '/castleblack',
                icon: 'fa fa-heartbeat',
                title: 'CastleBlack',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: ''
                },
                items: []
            },
            {
                url: '/drogon',
                icon: 'fa fa-optin-monster',
                title: 'Drogon',
                badge: {
                    className: 'badge badge-success badge-sm',
                    title: 'New'
                },
                items: [{url: '/drogon/customize/suite', icon: 'fa fa-flash',title: 'Customize Test',items: []},
                        {url: '/drogon/running/summary', icon: 'fa fa-area-chart',title: 'Running Summary',items: []}]
            },
            {
                url: '//viserion.swiggyops.de',
                icon: 'fa fa-superpowers',
                title: 'Viserion',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: 'New'
                },
                items: []
            },
            {
                url: '//qaicinga.swiggyops.de/icingaweb2/',
                icon: 'fa fa-ravelry',
                title: 'EastWatch',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: ''
                },
                items: []
            },
            {
                url: '//thewall.swiggyops.de',
                icon: 'fa fa-shield',
                title: 'The Wall',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: ''
                },
                items: []
            },

            {
                url: '/',
                icon: 'fa fa-tachometer',
                title: 'Tyrion',
                items: [
                    {
                      url: '/tyrion/eventdb',
                      icon: '',
                      title: 'EventsDB',
                      items: []
                    },
                    {
                      url: '/tyrion/eventsexecuteTest',
                      icon: '',
                      title: 'EventsExecuteTest',
                      items: []
                    },
                ],
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: 'New'
                },
            }
            ,

            {
                url: '//172.16.101.48:7100/#!/devices',
                icon: 'fa fa-cloud',
                title: 'Shutter Island',
                badge: {
                    className: 'badge badge-primary badge-sm',
                    title: 'New'
                },
                items: []
            },

            */
            {
                url: '/watchmen',
                icon: 'fa fa-shield',
                title: 'Watchmen',
                badge: {
                    className: 'badge badge-primary badge-sm'
                },
                items: []
            },
            {
                url: '/dashboard/db',
                icon: 'fa fa-cloud',
                title: 'Stark',
                badge: {
                    className: 'badge badge-primary badge-sm'
                },
                items: []
            },
            {
                url: '/battery',
                icon: 'fa fa-phone',
                title: 'Battery Historian',
                badge: {
                    className: 'badge badge-primary badge-sm'
                },
                items: []
            },
            /*
            {
                url: '/shadowtower',
                icon: 'fa fa-bolt',
                title: 'ShadowTower',
                items: [],
                badge: {
                    className: 'badge badge-primary badge-sms',
                    title: 'New'
                },
            },
            */
            {
                url: '/mqtt',
                icon: 'fa fa-heartbeat',
                title: 'MQTT Monitoring',
                items: [],
                badge: {
                    className: 'badge badge-primary badge-sms'
                },
            },
            {
                url: '/crashmonitoring',
                icon: 'fa fa-bolt',
                title: 'Crash Monitor',
                items: [],
                badge: {
                    className: 'badge badge-primary badge-sms',
                    title: 'New'
                },
            }
        ]
    }
]

export function navigation(state = Array.from(urls), action) {
    switch (action.type) {
        case 'SET_NAVIGATION':
            return Object.assign({}, state, {
                ...action.navigation
            })
        default:
            return state
    }
}
