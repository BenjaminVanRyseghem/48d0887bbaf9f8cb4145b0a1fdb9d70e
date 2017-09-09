import {connect} from "react-redux";
import {changeTweet, requestSubmitTweet} from "../actions";
import PropTypes from "prop-types";

import React from "react"; // eslint-disable-line no-unused-vars

function mapStateToProps(state) {
	return {
		isLogged: state.isLogged,
		status: state.status || "",
		isLoading: state.isLoading
	};
}

let NewTweet = ({isLogged, isLoading, status, dispatch}) => {
	if (!isLogged || isLoading) {
		return (<span/>);
	}

	return (<div className="new-tweet container-fluid">
		<div className="row">
			<div className="tweet col-md-6">
				<div className="text">
					<textarea placeholder="Post a new tweet..."
					          maxLength="140"
					          onChange={(event) => dispatch(changeTweet(event.target.value))}
					          value={status}>
					</textarea>
					<button className="btn btn-primary"
					        onClick={() => dispatch(requestSubmitTweet(status))}>
						Submit
					</button>
					<span className="counter">
						{status.length}/140
					</span>
				</div>
			</div>
		</div>
	</div>);
};

NewTweet.propTypes = {
	isLogged: PropTypes.bool,
	isLoading: PropTypes.bool,
	status: PropTypes.string
};

NewTweet = connect(mapStateToProps)(NewTweet);

export default NewTweet;
