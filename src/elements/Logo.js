import React from 'react'
import {Link} from 'react-router-dom'
import '../css/elements/logo.css'
const Logo = () =>
	<Link to="/" className="logo">
		<i className="sli-support" />
		<span className="title">HIKE </span>
	</Link>	
export default Logo
