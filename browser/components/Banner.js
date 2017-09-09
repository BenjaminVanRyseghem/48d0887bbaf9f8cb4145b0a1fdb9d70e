import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
	changePin,
	requestFetchTweets,
	requestLogin,
	requestLogout,
	requestSubmitPin
} from "../actions";

import React from "react"; // eslint-disable-line no-unused-vars

function mapStateToProps(state) {
	return {
		isLoginPending: state.isLoginPending,
		isLogged: state.isLogged,
		waitingForPin: state.waitingForPin,
		pin: state.pin || "",
		name: state.name || "",
		picture: state.picture || ""
	};
}

function loggedBanner(name, picture, dispatch) {
	let actions = [
		<button key="retweet" className="refresh btn btn-primary"
		        onClick={() => dispatch(requestFetchTweets())}>
			Refresh Tweets
		</button>,
		<button key="logout" className="logout btn btn-danger"
		        onClick={() => dispatch(requestLogout())}>
			Logout
		</button>
	];

	return <nav className="navbar navbar-expand-lg">
		<span className="h1 navbar-brand mb-0">
			<img className="avatar" src={picture}/>
			<span className="name d-none d-sm-inline-block">
				{name}
			</span>
		</span>
		<span className="actions">
			{actions}
		</span>
	</nav>;
}


let Banner = ({isLoginPending, isLogged, waitingForPin, pin, name, picture, dispatch}) => {
	let loginButton = "";

	if (isLogged) {
		return loggedBanner(name, picture, dispatch);
	}

	if (isLoginPending) {
		loginButton = <span className="spinner">
			<i className="fa fa-spinner fa-pulse fa-3x fa-fw"/>
		</span>;
	} else if (waitingForPin) {
		loginButton = <span className="login-button">
			<input className="pin"
			       placeholder="Twitter PIN"
			       value={pin}
			       onChange={(event) => dispatch(changePin(event.target.value))}>
			</input>
			<button className="btn btn-primary"
			        onClick={() => dispatch(requestSubmitPin(pin))}>
				Ok
			</button>
		</span>;
	} else if (!isLogged) {
		loginButton = <span className="login-button">
			<button className="btn btn-primary"
			        onClick={() => dispatch(requestLogin())}>
				Login with Twitter
			</button>
		</span>;
	}

	return (<nav className="navbar navbar-expand-lg">
		<h1>Manage Social</h1>
		<span className="actions">
			{loginButton}
		</span>
	</nav>);
};

Banner.propTypes = {
	isLoginPending: PropTypes.bool,
	isLogged: PropTypes.bool,
	waitingForPin: PropTypes.bool,
	pin: PropTypes.string,
	screenName: PropTypes.string,
	name: PropTypes.string,
	picture: PropTypes.string,
	dispatch: PropTypes.func
};

Banner = connect(mapStateToProps)(Banner);

export default Banner;
