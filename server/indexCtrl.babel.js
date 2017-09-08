import logger from "./logger";

/**
 * Registers the index route on the router.
 *
 * @param {Object} router the koa router object.
 */
export default function register(router) {
	router.get("/", index);
}

function index(ctx) {
	logger.info("got request to /");
	let {profile_image_url, name, screen_name, id} = ctx.session.userInfo || {};
	let data = {profile_image_url, name, screen_name, id};
	ctx.render("index", {initialData: JSON.stringify(data).replace(/"/gi, "'")}, true);
}
