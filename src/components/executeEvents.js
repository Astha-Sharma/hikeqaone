import React,{Component} from 'react';
import Request from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import '../css/elements/select-box.css'
import EventJobStatusHandler from './EventJobStatusHandler';


var SelectBox = require('../forms/select-box');



class FetchAPIData extends React.Component
{
  constructor()
  {
    super();
    this.state={
      data: [],
      jobid:-1,
      eventName: null,
      eventNames: null,
       startDate: moment(),
      endDate:moment()
    }

    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.invokeRequest=this.invokeRequest.bind(this);
    this.renderBody=this.renderBody.bind(this);
  }



  componentDidMount()
  {
    var URL="http://qa-u-developement-01.swiggyops.de:7500/api/v1/events/list";
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

  handleMultiChange(eventNames) {
    this.setState({ eventNames:eventNames });
  }
  handleStartDate(mystartDate) {

    this.setState({
  startDate: mystartDate

    });
  }

  handleEndDate(myEndDate) {

    this.setState({
      endDate:myEndDate
    });
  }


formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

formattedDate(strMyDate)
{
 return this.formatDate(strMyDate)
}



invokeRequest()
{
var sDate=this.formattedDate(this.state.startDate);
var eDate=this.formattedDate(this.state.endDate);

var dateString1 = new Date(this.formatDate(this.state.startDate));
var dateString2 = new Date(this.formatDate(this.state.endDate));
if(dateString2<dateString1)
 {
//put valiidation
 }
 var url="http://qa-u-developement-01.swiggyops.de:7500/api/v1/events/runquery?startDate="+sDate+"&endDate="+eDate+"&eventList="+this.state.eventNames;
   axios.get(url).then((response)=>{
     console.log("JobIs:"+response.data.job_id);
        if(response.data.job_id){
          this.setState({jobid:response.data.job_id});
          console.log("ttttkkkkkkkkk:"+this.state.jobid);
        }
    }).catch(function (error) {
        console.log("abcd errr:"+error);
    }.bind(this));

//Need to call the requestAPI which can send request
}

renderBody()
{

  return (this.state.jobid > 0)?<label>{this.state.jobid}</label>:<label>hi</label>
}
  render()
  {
    let querystatuscomponent;
    const options = this.state.data.map((datas,key) => {
      return <option value={datas.event_name}>{datas.event_name}</option>;
    });

    if (this.state.jobid > 0) {
        console.log("my noew Job Id",this.state.jobid);
        querystatuscomponent=<EventJobStatusHandler jobrunId={this.state.jobid}/>
     }
     else{
       <span>NO JobId recievd</span>
     }

    return(
      <div>
        <SelectBox label="Events" value={this.state.eventNames} multiple={true} onChange={this.handleMultiChange}>
          {options}
        </SelectBox>

        <br/>
        <br/>

        <label>startDate: </label> <DatePicker className="red-border" minDate="2014-12-31"  selected={this.state.startDate} dateFormat="YYYY-MM-DD" onChange={this.handleStartDate} />
        <label>EndDate  : </label> <DatePicker className="red-border" minDate="2014-12-31" selected={this.state.endDate}   dateFormat="YYYY-MM-DD" onChange={this.handleEndDate} />
         <br/>
         <br/>

    <button type="button" onClick={this.invokeRequest}>Submit</button>
                {querystatuscomponent}




      </div>
    )
  }
}
export default FetchAPIData;
