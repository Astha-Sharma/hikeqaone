import React, {Component} from 'react'
import {connect} from "react-redux";
import Immutable from "immutable";

class LoginPage extends Component  {

}

export default connect(state => {
    let castleblack = state.CastleBlack;
    return {
        castleblack: Immutable.Map.isMap(castleblack) ? castleblack.toJS() : castleblack
    }
})(CastleBlackPage);