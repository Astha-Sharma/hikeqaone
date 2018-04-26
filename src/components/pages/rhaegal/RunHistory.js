import React, {Component, PropTypes} from 'react';
import historyConstants from "../../../constants/rhaegal/historyConstants";
import {getRunDetailsByRunId} from "../../../actions/rhaegal/history";
import Immutable from "immutable";
import {connect} from "react-redux";
import MyRunDetails from "../../MyRunDetails";


class RunHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runId: "",
            runHistoryDetails: {},
            invalid:false
        }
    }

    componentDidMount() {
        var { dispatch } = this.props;
        this.state.runId = this.props.match.params.runId
        dispatch(getRunDetailsByRunId(this.state.runId)).then((result)=>{
            if (result.type === historyConstants.GET_RUN_DETAILS_FULFILLED) {
                let runList = JSON.parse(result.data.body.text);
                if (runList.status.statusType === 'SUCCESS') {
                    this.setState({runHistoryDetails: runList.data});
                }else {
                    alert("Something went wrong while fetching Run Details ");
                    this.setState({invalid: true});
                }
            }else if(result.type === historyConstants.GET_RUN_RESULTS_REJECT) {
                alert("Something went wrong while fetching Run Details ");
                this.setState({invalid: true});
            }else{
                alert("Something went wrong while fetching Run Details");
                this.setState({invalid: true});
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <MyRunDetails data={this.state.runHistoryDetails}/>
                </div>
                {this.state.invalid ? this.props.history.push("/rhaegal/history") : null}
            </div>
        )
    }
}

export default connect (state => {
    let runHistory = state.History
    return {
        runHistory: Immutable.Map.isMap(runHistory) ? runHistory.toJS() : runHistory
    }
})(RunHistory)
