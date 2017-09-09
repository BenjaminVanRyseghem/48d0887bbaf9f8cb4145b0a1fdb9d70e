import React from "react"; // eslint-disable-line no-unused-vars
import Banner from "./Banner"; // eslint-disable-line no-unused-vars
import NewTweet from "./NewTweet"; // eslint-disable-line no-unused-vars
import Tweets from "./Tweets"; // eslint-disable-line no-unused-vars

let App = () => {
	return (<div className="wrapper">
		<span className="far-away spinner">
			<i className="fa fa-spinner fa-pulse fa-3x fa-fw"/>
		</span>
		<Banner/>
		<div className="content">
			<NewTweet/>
			<Tweets/>
		</div>
	</div>);
};

export default App;
