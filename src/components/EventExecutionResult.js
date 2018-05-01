import React,{Component} from 'react';
import Widget from '../elements/Widget'
import axios from "axios";

class FetchEventResult extends React.Component
{
  constructor()
  {
    super();
    this .state={
      data:[],
    }
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("Event Fetch Result :componentWillReceiveProps>>"+nextProps.jobrunId);
    console.log("this.props.jobrunId:componentWillReceiveProps>>",this.props.jobrunId);
    var URL="http://<url>/api/v1/events/results?job_id="+this.props.jobrunId;
    console.log("MyURLForResult :",URL);
    axios.get(URL).then((response)=>{
      console.log("URL"+URL);
        this.setState({
          data:response.data,
        })
      }).catch(function (error) {
        console.log(" errr:"+error);
      }.bind(this));

  }
  render()
  {
    const options = this.state.data.map((datas,key) => {
      return(
        <tr>
          <td>{datas.event_name}</td>
          <td>{datas.screen_name}</td>
          <td>{datas.platform}</td>
          <td>{datas.app_version}</td>
          <td>{datas.total_events}</td>
        <td>{datas.errors}</td>
        <td>{datas.errors_object_position}</td>
        <td>{datas.errors_object_value}</td>
        <td>{datas.errors_context}</td>
        </tr>);
    });


    return(
        <div>
            <Widget>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
            <th>EventName</th>
            <th>ScreenName</th>
            <th>Platform</th>
            <th>AppVersion</th>
            <th>TotalEvents</th>
            <th>Errors</th>
            <th>ErrsObjctPos</th>
            <th>ErrsObjctVal</th>
            <th>ErrsCtx</th>
              </tr>
            </thead>
            <tbody style={{overflowY: 'auto', height: '50%'}}>
                  {options}
            </tbody>
          </table>
        </div>
        </Widget>
      </div>
    )
  }
}
export default FetchEventResult;
