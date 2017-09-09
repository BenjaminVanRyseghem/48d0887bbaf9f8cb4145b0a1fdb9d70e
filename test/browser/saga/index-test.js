import chai from "chai";
import {
	loginSaga,
	sendLogoutSaga,
	submitPinSaga,
	submitTweetSaga,
	tweetsSaga
} from "../../../browser/saga";
import {
	confirmLogin,
	loadingTweets,
	loginPending,
	logout,
	refreshTweets,
	requestFetchTweets,
	resetTweet,
	waitingForPin
} from "../../../browser/actions";
import {call, put} from "redux-saga/effects";
import {
	fetchTweets,
	login,
	sendLogout,
	submitPin,
	submitTweet
} from "../../../browser/api";


describe("saga", () => {
	it("tweets", () => {
		const generator = tweetsSaga();
		chai.expect(generator.next().value).to.deep.equal(put(loadingTweets()));
		chai.expect(generator.next().value).to.deep.equal(call(fetchTweets));
		chai.expect(generator.next("tweets").value).to.deep.equal(put(refreshTweets("tweets")));
	});

	it("submitTweet", () => {
		let status = "Hello World";
		const generator = submitTweetSaga({value: status});
		chai.expect(generator.next().value).to.deep.equal(call(submitTweet, status));
		chai.expect(generator.next().value).to.deep.equal(put(resetTweet()));
		chai.expect(generator.next().value).to.deep.equal(put(requestFetchTweets()));
	});

	it("login", () => {
		const generator = loginSaga();
		chai.expect(generator.next().value).to.deep.equal(put(loginPending()));
		chai.expect(generator.next().value).to.deep.equal(call(login));
		chai.expect(generator.next().value).to.deep.equal(put(waitingForPin()));
	});

	it("submitPin", () => {
		let pin = "12345";
		const generator = submitPinSaga({value: pin});
		chai.expect(generator.next().value).to.deep.equal(put(loginPending()));
		chai.expect(generator.next().value).to.deep.equal(call(submitPin, pin));
		chai.expect(generator.next("data").value).to.deep.equal(put(confirmLogin("data")));
	});

	it("sendLogout", () => {
		const generator = sendLogoutSaga();
		chai.expect(generator.next().value).to.deep.equal(put(loadingTweets()));
		chai.expect(generator.next().value).to.deep.equal(call(sendLogout));
		chai.expect(generator.next().value).to.deep.equal(put(logout()));
	});
});
