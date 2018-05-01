import React,{Component} from 'react';
import Request from 'superagent';
var SelectBox = require('../forms/select-box');



class FetchAPIData extends React.Component
{
  constructor()
  {
    super();
    this.state={
      data: [],
      eventName: null
    }

    this.handleMultiChange = this.handleMultiChange.bind(this);
  }


  componentDidMount1()
{
  fetch('http://<url>/api/v1/events/list').
  then((respData)=>respData.json()).
  then((jsonReponse)=>
  {
    this.setState({
      data:jsonReponse,
    })
  })
}

myFunction() {
    var x = document.getElementByName("11").type;
    document.getElementById("Events").innerHTML = x;
}


  handleMultiChange(eventName) {
    this.setState({ eventName })
  }

  render()
  {
    const options = this.state.data.map((datas,key) => {
      return <option id="N1" value={datas.event_name}>{datas.event_name}</option>;
    });


    return(
      <div>
        <SelectBox label="Events" value={this.state.eventName} multiple={true} onChange={this.handleMultiChange}>
          {options}
        </SelectBox>
      <br/>
      <br/>
       <button className="" onClick={this.myFunction}>Disable</button>
          <input type="text" name="t1" value={this.state.val1}/>



      </div>
    )
  }
}
export default FetchAPIData;
