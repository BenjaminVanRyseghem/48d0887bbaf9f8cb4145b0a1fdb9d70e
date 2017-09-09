import {call, put, takeLatest} from "redux-saga/effects";
import {fetchTweets, login, sendLogout, submitPin, submitTweet} from "../api";
import {
	confirmLogin,
	loadingTweets,
	loginPending,
	logout,
	refreshTweets,
	requestFetchTweets,
	requestLogin,
	requestLogout,
	requestSubmitPin,
	requestSubmitTweet,
	resetTweet,
	waitingForPin
} from "../actions";

export function* tweetsSaga() {
	try {
		yield put(loadingTweets());
		let tweets = yield call(fetchTweets);
		yield put(refreshTweets(tweets));
	} catch (e) {
		yield put({type: "TWEETS_FETCH_FAILED", message: e.message});
	}
}

export function* submitTweetSaga(action) {
	try {
		yield call(submitTweet, action.value);
		yield put(resetTweet());
		yield put(requestFetchTweets());
	} catch (e) {
		yield put({type: "TWEETS_FETCH_FAILED", message: e.message});
	}
}

export function* loginSaga() {
	try {
		yield put(loginPending());
		yield call(login);
		yield put(waitingForPin());
	} catch (e) {
		yield put({type: "LOGIN_FAILED", message: e.message});
	}
}

export function* submitPinSaga(action) {
	try {
		yield put(loginPending());
		const data = yield call(submitPin, action.value);
		yield put(confirmLogin(data));
	} catch (e) {
		yield put({type: "LOGIN_FAILED", message: e.message});
	}
}

export function* sendLogoutSaga() {
	try {
		yield put(loadingTweets());
		yield call(sendLogout);
		yield put(logout());
	} catch (e) {
		yield put({type: "LOGOUT_FAILED", message: e.message});
	}
}

function* mySaga() {
	yield takeLatest(requestSubmitPin().type, submitPinSaga);
	yield takeLatest(requestLogout().type, sendLogoutSaga);
	yield takeLatest(requestLogin().type, loginSaga);
	yield takeLatest(requestFetchTweets().type, tweetsSaga);
	yield takeLatest(requestSubmitTweet().type, submitTweetSaga);
}

export default mySaga;
