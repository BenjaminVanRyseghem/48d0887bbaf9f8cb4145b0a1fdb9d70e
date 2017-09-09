function errorHandling(error) {
	console.error("An error occurred.", error); // eslint-disable-line no-console
}

export const fetchTweets = () => {
	return fetch("/tweets", {
		credentials: "same-origin"
	}).then(
		response => response.json(),
		errorHandling
	);
};

export const submitPin = (pin) => {
	return fetch("/connect", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			verifier: pin
		})
	}).then(
		response => response.json(),
		errorHandling
	);
};

export const submitTweet = (status) => {
	return fetch("/post", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			status
		})
	}).then(
		response => response.json(),
		errorHandling
	);
};

export const login = () => {
	return fetch("/oauth_request", {
		credentials: "same-origin"
	}).then(
		response => response.text(),
		errorHandling
	).then(url => {
		window.open(url, "Twitter Login");
	});
};

export const sendLogout = () => {
	return fetch("/disconnect", {
		method: "POST",
		credentials: "same-origin"
	}).catch(errorHandling);
};
