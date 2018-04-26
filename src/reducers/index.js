import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {config} from './config'
import {colors, backgroundColors} from './colors'
import {navigation} from './navigation'
import {reducer as notificationsReducer} from 'reapop'
import TestSuite from './rhaegal/TestSuite'
import LeftNav from './LeftNav'
import ExecuteSuite from './rhaegal/executeSuite'
import SummarySuite from './rhaegal/summary'
import History from './rhaegal/history'
import CastleBlack from './CastleBlack'
import ExDrogonSuite from './drogon/exDrogonSuite'
import ShadowTower from './shadowtower'
import Mqtt from './mqtt'
import DrogonDepictSummary from './drogon/drogonDepictSummary'
import CrashMonitor from './crashmonitor'

const rootReducer = combineReducers({
    config,
    colors,
    backgroundColors,
    navigation,
    router: routerReducer,
    notifications: notificationsReducer(),
    TestSuite,
    LeftNav,
    ExecuteSuite,
    History,
    SummarySuite,
    CastleBlack,
    ExDrogonSuite,
    ShadowTower,
    DrogonDepictSummary,
    Mqtt,
    CrashMonitor
})
export default rootReducer
