import React,{Component} from 'react';
import Widget from '../elements/Widget'
import axios from "axios";
import FetchEventResult from './EventExecutionResult'
var Spinner = require('react-spinkit');

class EventJobStatusHandler extends React.Component
{
  constructor()
  {
    super();
    this .state={
      jobStatus:"Waiting For Response",
      jobId:null
    }
  }

  componentWillMount()
  {
  this.getJobStatus(10000);
  }

  getJobStatus(timeinterval)
  {
    setTimeout(function(){
      const url="http://qa-u-developement-01.swiggyops.de:7500/api/v1/events/jobstatus?job_id="+this.props.jobrunId;
          console.log(url);
          axios.get(url).then((response)=>{
            console.log("response.data.status for url :api/v1/events/jobstatus?job_id :",response.data.status);
              this.setState({jobStatus:response.data.status});
            console.log("response.data:url api/v1/events/jobstatus?job_id",response.data);
            console.log("From Event Handler :"+this.props.jobrunId);
            this.setState({jobId:this.props.jobrunId});
            console.log("jobstatus",this.state.jobStatus);
            console.log("jobId",this.state.jobId);
            console.log("Current jobstatus:",this.state.jobStatus);
            console.log("Current jobId :",this.state.jobId);
            }).catch(function (error) {
              console.log(" errr:"+error);
            }.bind(this));
    }.bind(this), timeinterval);
  }
  render()
  {
    let abcd;
    let progressloader;

    if (this.state.jobStatus=='Completed'){
        console.log("Current jobstatus Completed???:",this.state.jobStatus);
        abcd=<FetchEventResult jobrunId={this.state.jobId}/>
    }
    else if (this.state.jobStatus=='in-progress'){
         progressloader=<Spinner style="padding:20px;background-color:yellow" name="pacman" color="yellow"/>
         this.getJobStatus(30000);
         console.log("Current My Status jobstatus:",this.state.jobStatus);
         console.log("Current My else jobstatus:",this.state.jobId);
         abcd=<FetchEventResult jobrunId={this.state.jobId}/>
    }
    else{
      progressloader=<Spinner style="padding:20px;background-color:yellow" name="pacman" color="red"/>
      this.getJobStatus(30000);
    }
    return(
        <div>
          <br/>

          <Widget title="Job Status" description="">
            <div>
              <label>JobId:{this.props.jobrunId}</label>
                      {progressloader}
              <label>status:{this.state.jobStatus}</label>
                    <marquee direction="left" bgcolor="blue">status:{this.state.jobStatus}</marquee>
             </div>
            </Widget>
                {abcd}



      </div>
    )
  }
}
export default EventJobStatusHandler;
