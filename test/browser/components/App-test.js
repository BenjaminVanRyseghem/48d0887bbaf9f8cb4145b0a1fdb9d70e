import React from "react"; // eslint-disable-line no-unused-vars
import App from "../../../browser/components/App"; // eslint-disable-line no-unused-vars
import renderComponent from "../helpers/renderComponent";
import chai from "chai";

const generic = {
	isLogged: false,
	isLoading: false,
	status: ""
};

function render(props = {}) {
	return renderComponent(App, {}, {
		...generic,
		...props
	});
}

describe("App", () => {
	it("renders a spinner far away", () => {
		let $tree = render({}, {}, false, true);

		chai.expect($tree.find(".spinner.far-away").length).to.equal(1);
	});

	it("renders the banner", () => {
		let $tree = render({}, {}, false, true);

		chai.expect($tree.find("Banner").length).to.equal(1);
	});

	it("renders the input", () => {
		let $tree = render({}, {}, false, true);

		chai.expect($tree.find(".content NewTweet").length).to.equal(1);
	});

	it("renders the tweets", () => {
		let $tree = render({}, {}, false, true);

		chai.expect($tree.find(".content Tweets").length).to.equal(1);
	});
});
