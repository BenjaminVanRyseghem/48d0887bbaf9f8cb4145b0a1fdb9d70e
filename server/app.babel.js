import Koa from "koa";
import "babel-polyfill";
import bodyParser from "koa-bodyparser";

import session from "koa-session";
import krouter from "koa-router";
import serve from "koa-static";
import logger from "./logger";
import indexCtrl from "./indexCtrl";
import routesCtrl from "./routesCtrl";
import Pug from "koa-pug";

const app = new Koa();
const router = krouter();
const PORT = 3000;

new Pug({  // eslint-disable-line no-new
	viewPath: "./views",
	debug: false,
	pretty: false,
	compileDebug: false,
	app: app // equals to pug.use(app) and app.use(pug.middleware)
});

app.keys = ["some secret hurr"];

app.use(bodyParser());
app.use(session({
	key: "koa:session"
}, app));

indexCtrl(router);
routesCtrl(router);

app.use(serve("public/"));
app
	.use(router.routes())
	.use(router.allowedMethods());

export default app.listen(PORT, () => {
	logger.info(`Listening on port ${PORT}`);
});
