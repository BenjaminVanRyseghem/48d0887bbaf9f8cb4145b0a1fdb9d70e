import bunyan from "bunyan";

const bunyanOptions = {
	name: "manage-social",
	streams: [
		{
			level: "info",
			stream: process.stdout
		}, {
			level: "debug",
			type: "rotating-file",
			path: "logger.log",
			period: "1d",
			count: 3
		}
	],
	serializers: bunyan.stdSerializers,
	src: true
};

let logger = bunyan.createLogger(bunyanOptions);

if (process.env.NODE_ENV === "test") {
	// Absorb logs during tests
	logger = {
		info: () => {},
		error: () => {}
	};
}

export default logger;
