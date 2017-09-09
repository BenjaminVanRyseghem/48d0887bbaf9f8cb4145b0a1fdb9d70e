import {
	fetchTweets,
	login,
	sendLogout,
	submitPin,
	submitTweet
} from "../../../browser/api";
import chai from "chai";
import fetchMock from "fetch-mock";
import sinon from "sinon";

describe("api", () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it("fetchTweets", (done) => {
		fetchMock.get("/tweets", "{\"foo\":42}");
		fetchTweets().then((data) => {
			chai.expect(data).to.deep.equal({foo: 42});
			done();
		});
	});

	it("submitPin", (done) => {
		fetchMock.post("/connect", "{\"foo\":42}");
		submitPin().then((data) => {
			chai.expect(data).to.deep.equal({foo: 42});
			done();
		});
	});

	it("submitTweet", (done) => {
		fetchMock.post("/post", "{\"foo\":42}");
		submitTweet().then((data) => {
			chai.expect(data).to.deep.equal({foo: 42});
			done();
		});
	});

	it("login", (done) => {
		fetchMock.get("/oauth_request", "URL");
		let mock = sinon.mock(window);
		let expectation = mock.expects("open").withArgs("URL", "Twitter Login");

		login().then(() => {
			chai.expect(expectation.verify()).to.be.true;
			done();
		});
	});

	it("sendLogout", (done) => {
		fetchMock.post("/disconnect", {});
		sendLogout().then(() => {
			chai.expect(true).to.be.true;
			done();
		});
	});
});
