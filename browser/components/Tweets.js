import React from "react"; // eslint-disable-line no-unused-vars
import {connect} from "react-redux";
import Tweet from "./Tweet"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
	return {
		tweets: [].concat(state.tweets),
		isLogged: state.isLogged,
		isLoading: state.isLoading
	};
};

let Tweets = ({tweets, isLogged, isLoading}) => {
	if (!isLogged) {
		return <div className="not-logged">
			Please login to see your tweets.
		</div>;
	}

	if (isLoading) {
		return <span className="spinner">
			<i className="fa fa-spinner fa-pulse fa-3x fa-fw"/>
		</span>;
	}

	if (!tweets.length) {
		return <div className="no-tweet">
			Please hit "Refresh Tweets" to see your tweets.
		</div>;
	}

	const tweetList = tweets.map((tweet) => {
		return <Tweet key={tweet.id_str} tweet={tweet}/>;
	});

	return <div className="tweets container-fluid">
		{tweetList}
	</div>;
};

Tweets.propTypes = {
	isLogged: PropTypes.bool,
	isLoading: PropTypes.bool,
	tweets: PropTypes.arrayOf(PropTypes.shape({
		created_at: PropTypes.string,
		text: PropTypes.bool,
		id_str: PropTypes.string,
		favorited: PropTypes.bool
	}))
};

Tweets = connect(mapStateToProps)(Tweets);

export default Tweets;
