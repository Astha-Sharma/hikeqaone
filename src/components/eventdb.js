import React,{Component} from 'react';
import axios from "axios";
var fetch = require('node-fetch');

class EventsDB extends React.Component
{
  constructor()
  {
    super();
    this .state={
      data:[],
    }
  }

  componentDidMount()
  {
    var url="http://<url>/api/v1/events/metainfo";
    axios.get(url).then((response)=>{
      console.log("URL"+url);
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
          <td>{datas.screen_name}</td>
            <td>{datas.event_name}</td>
          <td>{datas.object_name}</td>
          <td>{datas.object_value}</td>
        <td>{datas.object_position}</td>
        <td>{datas.context}</td>
        <td> <button type="button">Edit</button></td><td><button type="button">Delete</button> </td>
        </tr>);
    });


    return(

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ScreenName</th>
                <th>EventName</th>
                <th>ObjectName</th>
                <th>ObjectValue</th>
                <th>ObjectPosition</th>
                <th>Context</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody style={{overflowY: 'auto', height: '50%'}}>
                  {options}
            </tbody>
          </table>

      </div>
    )
  }
}
export default EventsDB;
