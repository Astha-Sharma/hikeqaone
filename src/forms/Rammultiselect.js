var React = require('react');
var Multiselect = require('react-bootstrap-multiselect');

var someReactComponent = React.createClass({
    getInitialState: function(){
        var that = this;
        $("element").on("event", function(){
            $.get("new-data-from-url", function(newData){
                that.setState(newData);

                // to sync manually do
                that.refs.myRef.syncData();
            });
        });

        return {
            myData : [{value:'One',selected:true},{value:'Two'}]
        };
    },
    render: function () {
        return (
            <Multiselect onChange={this.handleChange} ref="myRef" data={this.state.myData} multiple />
        );
    }
});

// module exports=someReactComponent;
