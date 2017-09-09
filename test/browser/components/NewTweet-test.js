import React from "react"; // eslint-disable-line no-unused-vars
import NewTweet from "../../../browser/components/NewTweet"; // eslint-disable-line no-unused-vars
import renderComponent from "../helpers/renderComponent";
import chai from "chai";

const generic = {
	isLogged: false,
	isLoading: false,
	status: ""
};

function render(props = {}) {
	return renderComponent(NewTweet, {}, {
		...generic,
		...props
	});
}

describe("NewTweet", () => {
	it("renders nothing if not logged", () => {
		let $tree = render({
			isLogged: false
		});

		chai.expect($tree.find(".span").text()).to.equal("");
	});

	it("renders nothing if loading", () => {
		let $tree = render({
			isLogged: true,
			isLoading: true
		});

		chai.expect($tree.find(".span").text()).to.equal("");
	});

	it("renders a textarea if logged in", () => {
		let $tree = render({
			isLogged: true,
			isLoading: false
		});

		chai.expect($tree.find(".new-tweet").length).to.equal(1);
		chai.expect($tree.find("textarea[maxLength=\"140\"]").length).to.equal(1);
	});
});
