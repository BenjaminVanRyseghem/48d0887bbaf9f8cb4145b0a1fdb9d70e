import logger from "./logger";
import request from "request-promise-native";
import queryString from "querystring";

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

/**
 * Registers the index route on the router.
 *
 * @param {Object} router the koa router object.
 */
export default function register(router) {
	router.get("/oauth_request", oauthRequest);
	router.get("/tweets", tweets);
	router.post("/connect", connect);
	router.post("/disconnect", disconnect);
	router.post("/post", post);
}

async function oauthRequest(ctx, next) {
	logger.info("got request to /oauth_request");
	let url = "https://api.twitter.com/oauth/request_token";

	let oauth = {
		callback: "oob",
		consumer_key: CONSUMER_KEY,
		consumer_secret: CONSUMER_SECRET
	};

	await request.post({
		url: url,
		oauth: oauth
	}).then((body) => {
		let oAuthToken = queryString.parse(body);
		ctx.session.oAuthToken = oAuthToken;
		ctx.body = `https://api.twitter.com/oauth/authorize?${queryString.stringify({oauth_token: oAuthToken.oauth_token})}`;

		next();
	}, (error) => {
		console.error(error); // eslint-disable-line no-console
		ctx.body = JSON.stringify({errors: [error]});
		next();
	});
}

async function connect(ctx, next) {
	logger.info("got request to /connect");

	let url = "https://api.twitter.com/oauth/access_token";

	let verifier = ctx.request.body.verifier;
	let oAuthToken = (ctx.session || {}).oAuthToken || {};
	let oauth = {
		verifier,
		consumer_key: CONSUMER_KEY,
		consumer_secret: CONSUMER_SECRET,
		token: oAuthToken.oauth_token,
		token_secret: oAuthToken.oauth_token_secret
	};

	await request.post({
		url,
		oauth
	}).then((body) => {
		let data = queryString.parse(body);
		ctx.session = ctx.session || {};
		ctx.session.data = data;
		delete ctx.session.oAuthToken;

		oauth = {
			consumer_key: CONSUMER_KEY,
			consumer_secret: CONSUMER_SECRET,
			token: data.oauth_token,
			token_secret: data.oauth_token_secret
		};

		return request.get({
			url: `https://api.twitter.com/1.1/users/show.json?user_id=${data.user_id}`,
			oauth
		});
	}).then((body) => {
		ctx.body = body;
		ctx.session.userInfo = JSON.parse(body);
		next();
	}, (error) => {
		console.error(error); // eslint-disable-line no-console
		ctx.body = JSON.stringify({errors: [error]});
		next();
	});
}

async function tweets(ctx, next) {
	logger.info("got request to /connect");

	let data = (ctx.session || {}).data || {};
	let url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${data.user_id}&count=100`;

	let oauth = {
		consumer_key: CONSUMER_KEY,
		consumer_secret: CONSUMER_SECRET,
		token: data.oauth_token,
		token_secret: data.oauth_token_secret
	};

	await request.get({
		url,
		oauth
	}).then((body) => {
		ctx.body = body;
		next();
	}, (error) => {
		console.error(error); // eslint-disable-line no-console
		ctx.body = JSON.stringify({errors: [error]});
		next();
	});
}

function disconnect(ctx) {
	logger.info("got request to /disconnect");
	let data = (ctx.session || {}).data || {};
	let id = data.user_id;
	delete ctx.session.data;
	delete ctx.session.userInfo;

	ctx.body = id;
}

async function post(ctx, next) {
	logger.info("got request to /post");
	let status = ctx.request.body.status;
	let url = `https://api.twitter.com/1.1/statuses/update.json?status=${encodeURIComponent(status)}`;

	let data = (ctx.session || {}).data || {};

	let oauth = {
		consumer_key: CONSUMER_KEY,
		consumer_secret: CONSUMER_SECRET,
		token: data.oauth_token,
		token_secret: data.oauth_token_secret
	};

	await request.post({
		url,
		oauth
	}).then((body) => {
		ctx.body = body;
		next();
	}, (error) => {
		console.error(error); // eslint-disable-line no-console
		ctx.body = JSON.stringify({errors: [error]});
		next();
	});
}

