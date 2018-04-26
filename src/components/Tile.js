import React from 'react';
import _ from 'underscore';
import styles from '../css/tile.css';

class Tile extends React.Component {
    static defaultProps = {
        theme:'green',
        titleClass:'',
        primary:{},
        seconday:[],
    };

    static propTypes = {

        theme: React.PropTypes.string,
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        titleClass: React.PropTypes.string,
        primary: React.PropTypes.object,
        secondary: React.PropTypes.array
    };

    render() {
        var primary = this.props.primary;
        var secondary = this.props.secondary;
        return (
            <div className={'dashboard-tile'} >
                {this.props.title || this.props.subtitle?
                    (<div style = {{'background' : this.props.theme}} className={this.props.titleClass ? ('tile-title ' + this.props.titleClass) : 'tile-title'}>
                            <h7 style = {{"textAlign" : "center"}} >
                                {this.props.title}
                                &nbsp;
                                <h6>{this.props.subtitle}</h6>
                            </h7>
                        </div>
                    ):null
                }
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

export default Tile;
