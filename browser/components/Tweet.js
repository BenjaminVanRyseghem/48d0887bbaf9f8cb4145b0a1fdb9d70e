import React from "react"; // eslint-disable-line no-unused-vars
import moment from "moment";
import PropTypes from "prop-types";

let Tweet = ({screenName, tweet}) => {
	let favorited = tweet.favorited ? "fa-star" : "fa-star-o";
	let retweeted = "";

	if (tweet.retweeted) {
		retweeted = <i className="fa fa-retweet"/>;
	} else {
		retweeted = <i className="not-retweeted fa fa-retweet"/>;
	}

	return (
		<div className="row">
			<div className="tweet col-md-6">
				<div className="text">
					{tweet.text}
				</div>
				<div className="info">
					<span className="creation-time">
						{moment(tweet.created_at).format("MMMM Do YYYY, h:mm:ss a")}
					</span>
					<span className="metadata">
						<span className="link">
							<a
								href={`https://twitter.com/${screenName}/status/${tweet.id_str}`}>
								<i className="fa fa-at"/>
							</a>
						</span>
						<span className="favorited">
							<i className={"fa " + favorited}/>
						</span>
						<span className="retweeted">
							{retweeted}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

Tweet.propTypes = {
	screenName: PropTypes.string,
	tweet: PropTypes.shape({
		created_at: PropTypes.string,
		text: PropTypes.string,
		id_str: PropTypes.string,
		favorited: PropTypes.bool,
		retweeted: PropTypes.bool
	})
};

export default Tweet;
