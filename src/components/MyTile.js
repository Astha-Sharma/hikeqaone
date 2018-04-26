import React from 'react';
import _ from 'underscore';

class MyTile extends React.Component {
    static defaultProps = {
        theme:'green',
        titleClass:'',
        primary:{},
        secondary:[],
    };

    static propTypes = {
        theme: React.PropTypes.string,
        titleClass: React.PropTypes.string,
        primary: React.PropTypes.object,
        secondary: React.PropTypes.array
    };

    render() {
        var primary = this.props.primary;
        var secondary = this.props.secondary;
        return (
            <div className={'dashboard-tile'} >
                <div className = 'tile-body'>
                    <div className='tile-content'>
                        <div className='tile-primary'>
                            <div className='tile-label' >{primary.label}</div>
                            <div className='tile-value' style = {{'color':this.props.theme}}>{primary.value}</div>
                        </div>
                        <div className='tile-additional' style = {{'display':'inline-block'}}>
                            {
                                _.map(secondary, ((secondaryObj, index) => (
                                        <div  key={'tile-secondary-' + index} className='tile-secondary'>
                                            <div className='tile-label' style = {{'color':this.props.theme}}>{secondaryObj.label}</div>
                                            <div className='tile-value'>{secondaryObj.value}</div>
                                        </div>)
                                ))
                            }
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default MyTile;
