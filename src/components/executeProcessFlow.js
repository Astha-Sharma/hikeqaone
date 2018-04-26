import React from 'react';
import ProcessFlow from './ProcessFlow';

const flowData = [

            {
                'title' : 'Check Hardware Availability',
                'detail' : 'Check the status of load test instances',
                'bgColor' : '#ff8d00'
            },
            {
                'title' : 'Starting Instances',
                'detail' : 'Starting The Instances',
                'bgColor' : '#fdc33b'
            },
            {
                'title' : 'Preparing Your Test',
                'detail' : 'Systems are provisioned for your test',
                'bgColor' : '#98b616'
            },
            {
                'title' : 'Execution Started',
                'detail' : 'Test Started.Watch your console',
                'bgColor' : '#26a69a'
            }
    ];

export default class ExecuteProcessFlow extends React.Component {
	render(){
    let status=this.props.flowStatus;
		return (
			<div>
              <br/>
              <br/>
              <ProcessFlow flowData = {flowData} flowStatus={status}/>
      </div>
        );
	}
};
