'use strict';
import React,{Component} from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import PropTypes from 'prop-types';
import {setValidationResult} from './utils/';
import '../css/elements/datepicker.css';

class MyDatePicker extends Component {
    static propTypes = {
        /**
         * label for the date picker
         */
        label: PropTypes.string,
        /**
          * value which specifies whether the component should be shown or not
          */
        show: PropTypes.bool,
        /**
         * the unique Key of the date picker
         */
        elementId: PropTypes.string,
        /**
         * Date/Dates passed as a list (when singleDatePicker is false) or as a single
         * moment object (when singleDatePicker is true)
         */
        value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        /**
         * Minimum selectable date
         */
        minDate: PropTypes.object,
        /**
         * Maximum selectable date
         */
        maxDate: PropTypes.object,
        /**
         * Enable/Disable picking a range of dates
         */
        singleDatePicker: PropTypes.bool,
        /**
         * onChange event handler
         */
        onChange: PropTypes.func,
        /**
         * Enable DateTimePicker.
         */
        timePicker: PropTypes.bool,
        /**
         * Enable Time DateTimePicker with 24-Hour format.
         */
        timePicker24Hour: PropTypes.bool,
        /**
         * Enables seconds in DateTimePicker.
         */
        timePickerSeconds: PropTypes.bool,
        /**
         * Minutes Increments in DateTimePicker.
         */
        timePickerIncrement: PropTypes.number,
        /**
         * Position of DatePicker(center, left or right).
         */
        opens: PropTypes.oneOf(['center', 'left', 'right']),
        /**
         * Position of DatePicker(up or down).
         */
        drops: PropTypes.oneOf(['up', 'down']),
        /**
        * Display range labels provided in ranges prop
        */
        displayRangeLabel: PropTypes.bool
    };

    static defaultProps = {
        startDate: moment(),
        endDate: moment(),
        value: moment(),
        singleDatePicker: true,
        timePicker: false,
        opens: 'center',
        drops: 'down',
        timePicker24Hour: false,
        timePickerSeconds: false,
        timePickerIncrement: 15,
        type:"MyDatePicker",
        show: true
    };

    state = {
        value:{
            startDate: this.props.startDate,
            endDate: this.props.endDate
        },
        path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
    };

    handleChange = (event, picker) => {
        // We are ignoring the 'show' event which is triggerred when the calendar is
        // displayed
        if (event.type === 'apply' || event.type === 'cancel') {
            var value='';
            var eventType=null;
            if (event.type === 'apply') {
                value = {
                    startDate: picker.startDate,
                    endDate: picker.endDate,
                };
                if(this.props.displayRangeLabel) {
                    value.label = picker.chosenLabel;
                }
                eventType = 'apply';
            } else if (event.type === 'cancel') {
                value = this.state.value;
                eventType = 'cancel';
            }
            var obj ={value:value, eventType:eventType,path: this.state.path};
            setValidationResult.bind(this)(this.props, obj, this.props.onChange);
        }
    };

    componentDidMount() {
        var obj ={value:this.state.value,path: this.state.path}
        setValidationResult.bind(this)( this.props, obj, this.props.handleInitialValidation);
    }

    getSelectedValue = () => {
        var selectedDateRange = this.state.value || this.props.value;
        var label="";
        if (typeof selectedDateRange === "object") {
            var startDate = selectedDateRange.startDate.format('DD-MMM-YYYY');
            var endDate = selectedDateRange.endDate.format('DD-MMM-YYYY');
            if(startDate ===endDate)
                label = startDate;
            else
                label =  startDate + " - " + endDate;
            // To display Range labels instead of date range
            if(this.props.displayRangeLabel) {
                var ranges = this.props.ranges;
                if(!selectedDateRange.label) {
                    for(var range in ranges) {
                        if(ranges[range][0].isSame(selectedDateRange.startDate) && ranges[range][1].isSame(selectedDateRange.endDate)) {
                            label = range;
                        }
                    }
                }
                else if(ranges[selectedDateRange.label]) {
                    label = selectedDateRange.label;
                }
            }
        } else {
            label = selectedDateRange;
        }
        return label;
    };

    render() {
        if (!this.props.show) {
           return null;
        }
        return (
            <div className={'commonFormComponents form-group form-md-line-input '+(this.props.className || '')} style={this.props.style}>
                {this.props.label ? <div>{this.props.label}</div> : null}
                <DateRangePicker {...this.props}
                    className={null}
                    singleDatePicker={this.props.singleDatePicker}
                    startDate={this.state.value.startDate}
                    endDate={this.state.value.endDate}
                    autoUpdateInput={false}
                    onEvent={this.handleChange}>
                    <div className='my-daterangepicker-container'>
                        <input
                            type='text'
                            className='form-control my-daterangepicker-input'
                            ref='inputBox'
                            readOnly
                            value={this.getSelectedValue()} ref={this.props.elementId}/>
                        <i className='fa fa-calendar my-daterangepicker-icon'/>
                    </div>
                </DateRangePicker>
                <div className="errorContainer">
                    {this.props.clickedSubmit && this.state.validationResult && this.state.validationResult.statusType === "ERROR" ? this.state.validationResult.statusMessage : null}
                </div>
            </div>
        )
    }
}

export default MyDatePicker;
