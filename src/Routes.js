import React from 'react'
import {Switch, Route} from 'react-router'


//dashboards
import Dashboard1 from './dashboards/Dashboard1'

//icons
import Flags from './icons/Flags'
import FontAwesome from './icons/FontAwesome'
import Ionicons from './icons/Ionicons'
import MaterialDesignIcons from './icons/MaterialDesignIcons'
import SimpleLineIcons from './icons/SimpleLineIcons'
import WeatherIcons from './icons/WeatherIcons'


//Components
import ExecuteTest from './components/executeTest'
import EventsExecuteTest from './components/eventsexecuteTest'
import Eventdb from './components/eventdb'
import CastleBlackPage from './components/pages/castleblackPage'
import EmptyPage from './components/pages/EmptyPage'
import AddSuite from './components/pages/rhaegal/addSuite'
import ExecuteSuite from './components/pages/rhaegal/executeSuite'
import SuiteSelection from './components/pages/rhaegal/SuiteSelection'
import ExDrogonSuite from './components/pages/drogon/exDrogonSuite'
import TestResult from "./components/pages/TestRun";
import TestSuites from "./components/pages/TestSuites";
import History from './components/pages/rhaegal/History'
import ExecuteSummary from "./components/pages/rhaegal/summary";
import RunHistory from "./components/pages/rhaegal/RunHistory";
import TestCase from "./components/pages/TestCase"
import DrogonRunSummary from "./components/pages/drogon/drogonRunSummary"
import Mqtt from "./components/pages/Mqtt";
import Watchmen from "./components/pages/Watchmen";
import Stark from "./components/pages/Stark";
import Battery from "./components/pages/Battery";
import CrashMonitor from "./components/pages/CrashMonitor";


const Routes = () =>
	<Switch>
        <Route exact path="/tyrion/eventdb" component={Eventdb} />
        <Route exact path="/tyrion/eventsexecuteTest" component={EventsExecuteTest}/>
        <Route exact path="/castleblack" component={CastleBlackPage} />
        <Route exact path="/viserion" />
        <Route exact path="/EastWatch" />
        <Route exact path="/" component={Dashboard1} />
        <Route exact path="/rhaegal/addSuite" component={AddSuite} />
        <Route exact path="/rhaegal/execute" component={SuiteSelection} />
        <Route exact path="/rhaegal/execute/namespace/:namespaceName/component/:componentName/suite/:suiteName" component={ExecuteSuite} />
        <Route exact path="/rhaegal/history" component={History} />
        <Route exact path="/rhaegal/history/:runId" component={RunHistory} />
        <Route exact path="/rhaegal/summary/:runId" component={ExecuteSummary} />
        <Route exact path="/shadowtower" component={TestSuites}/>
        <Route exact path="/mqtt" component={ Mqtt }/>
        <Route exact path="/watchmen" component={ Watchmen }/>
        <Route exact path="/dashboard/*" component={ Stark }/>
        <Route exact path="/battery" component={ Battery }/>
        <Route exact path="/crashmonitoring" component={ CrashMonitor }/>
        <Route exact path="/api/shadowtower/getruns/:runId/runs" component={TestResult}/>
        <Route exact path="/api/shadowtower/gettests/:runId/runs" component={TestCase}/>
		<Route exact path="/drogon/customize/suite" component={ExDrogonSuite} />
		<Route exact path="/drogon/running/summary" component={DrogonRunSummary} />
        <Route component={EmptyPage} />
	</Switch>

export default Routes
