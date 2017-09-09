import React from "react"; // eslint-disable-line no-unused-vars
import Tweet from "../../../browser/components/Tweet"; // eslint-disable-line no-unused-vars
import renderComponent from "../helpers/renderComponent";
import chai from "chai";

const generic = {
	screenName: "",
	tweet: {}
};

function render(props = {}) {
	return renderComponent(Tweet, {
		...generic,
		...props
	});
}

describe("Tweet", () => {
	it("renders tweet", () => {
		let $tree = render({
			screenName: "bvanryseghem",
			tweet: {
				created_at: "2017-09-11T04:48:03",
				id_str: "id",
				favorited: true,
				retweeted: false,
				text: "FOO"
			}
		});

		chai.expect($tree.find(".text").text()).to.equal("FOO");
		chai.expect($tree.find(".creation-time").text()).to.equal("September 11th 2017, 4:48:03 am");
		chai.expect($tree.find(".link a[href=\"https://twitter.com/bvanryseghem/status/id\"]").length).to.equal(1);
		chai.expect($tree.find("i.fa.fa-star").length).to.equal(1);
		chai.expect($tree.find("i.not-retweeted.fa.fa-retweet").length).to.equal(1);
	});
});
