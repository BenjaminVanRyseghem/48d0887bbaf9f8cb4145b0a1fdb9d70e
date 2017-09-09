import React from "react"; // eslint-disable-line no-unused-vars
import Tweets from "../../../browser/components/Tweets"; // eslint-disable-line no-unused-vars
import renderComponent from "../helpers/renderComponent";
import chai from "chai";

const generic = {
	isLogged: false,
	isLoading: false,
	tweets: []
};

function render(props = {}) {
	return renderComponent(Tweets, {}, {
		...generic,
		...props
	});
}

describe("Tweets", () => {
	it("renders a message when not logged", () => {
		let $tree = render({
			isLogged: false
		});

		chai.expect($tree.find(".not-logged").text()).to.equal("Please login to see your tweets.");
	});

	it("renders a spinner", () => {
		let $tree = render({
			isLogged: true,
			isLoading: true
		});

		chai.expect($tree.find(".spinner").length).to.equal(1);
	});

	it("renders a message when there is no tweet", () => {
		let $tree = render({
			isLogged: true,
			isLoading: false,
			tweets: []
		});

		chai.expect($tree.find(".no-tweet").text()).to.equal("Please hit \"Refresh Tweets\" to see your tweets.");
	});

	it("renders tweets", () => {
		let $tree = render({
			isLogged: true,
			isLoading: false,
			tweets: [{id_str: "1"}, {id_str: "2"}, {id_str: "3"}]
		});

		chai.expect($tree.find(".tweets").length).to.equal(1);
	});
});
