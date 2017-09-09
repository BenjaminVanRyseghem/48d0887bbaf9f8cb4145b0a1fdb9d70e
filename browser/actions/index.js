export const changePin = (pin) => ({type: "CHANGE_PIN", value: pin});
export const changeTweet = (status) => ({type: "CHANGE_TWEET", value: status});
export const confirmLogin = (data) => ({type: "CONFIRM_LOGIN", value: data});
export const loadingTweets = () => ({type: "LOADING_TWEETS"});
export const loginPending = () => ({type: "LOGIN_PENDING"});
export const logout = () => ({type: "LOGOUT"});
export const refreshTweets = (data) => ({type: "REFRESH_TWEETS", value: data});
export const requestFetchTweets = () => ({type: "TWEETS_FETCH_REQUESTED"});
export const requestLogin = () => ({type: "LOGIN_REQUESTED"});
export const requestLogout = () => ({type: "LOGOUT_REQUESTED"});
export const requestSubmitPin = (pin) => ({type: "PIN_SUBMITTED", value: pin});
export const requestSubmitTweet = (status) => ({
	type: "TWEET_SUBMITTED",
	value: status
});
export const resetTweet = () => ({type: "RESET_TWEET"});
export const waitingForPin = () => ({type: "WAITING_FOR_PIN"});
