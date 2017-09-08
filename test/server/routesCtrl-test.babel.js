import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import nock from "nock";

const should = chai.should();
chai.use(chaiHttp);

describe("routes: twitter", () => {
	describe("oauth_request", () => {
		beforeEach(() => {
			nock("https://api.twitter.com")
				.post("/oauth/request_token")
				.reply(200, "oauth_token=Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik&oauth_token_secret=Kd75W4OQfb2oJTV0vzGzeXftVAwgMnEK9MumzYcM&oauth_callback_confirmed=true");
		});

		it("should return the login url", () => {
			chai
				.request(server)
				.get("/oauth_request")
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.eql("https://api.twitter.com/oauth/authorize?oauth_token=Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik");
					done();
				});
		});
	});

	describe("tweets", () => {
		beforeEach(() => {
			nock("https://api.twitter.com")
				.get("/1.1/statuses/user_timeline.json?user_id=undefined&count=100")
				.reply(200, "TWEETS");
		});

		it("should returns some tweets", () => {
			chai
				.request(server)
				.get("/tweets")
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.eql("TWEETS");
					done();
				});
		});
	});

	describe("connect", () => {
		beforeEach(() => {
			nock("https://api.twitter.com")
				.post("/oauth/access_token")
				.reply(200, "oauth_token=FOO&oauth_token_secret=BAR&user_id=BAZ");
			nock("https://api.twitter.com")
				.get("/1.1/users/show.json?user_id=BAZ")
				.reply(200, "{\"id\":\"INFO\"}");
		});

		it("should return the user info", () => {
			chai
				.request(server)
				.post("/connect")
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.eql("{\"id\":\"INFO\"}");
					done();
				});
		});
	});

	describe("disconnect", () => {
		it("should return the user id", () => {
			chai
				.request(server)
				.post("/disconnect")
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.eql("undefined");
					done();
				});
		});
	});

	describe("post", () => {
		beforeEach(() => {
			nock("https://api.twitter.com")
				.post("/1.1/statuses/update.json?status=foo%20bar%20baz")
				.reply(200, "TWEET");
		});

		it("should return the tweet", () => {
			chai
				.request(server)
				.post("/post")
				.send({status: "foo bar baz"})
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.eql("TWEET");
					done();
				});
		});
	});
});
