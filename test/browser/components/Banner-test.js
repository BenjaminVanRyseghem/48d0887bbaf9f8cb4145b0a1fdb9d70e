import React from "react"; // eslint-disable-line no-unused-vars
import Banner from "../../../browser/components/Banner"; // eslint-disable-line no-unused-vars
import renderComponent from "../helpers/renderComponent";
import chai from "chai";

const generic = {
	isLoginPending: false,
	isLogged: false,
	waitingForPin: false,
	pin: "",
	screenName: "",
	name: "",
	picture: ""
};

function render(props = {}) {
	return renderComponent(Banner, {}, {
		...generic,
		...props
	});
}

describe("Banner", () => {
	describe("not logged in", () => {
		it("displays a login button when not logged in", () => {
			let $tree = render({
				isLogged: false
			});

			chai.expect($tree.find(".login-button button").length).to.equal(1);
			chai.expect($tree.find(".login-button button").text()).to.equal("Login with Twitter");
		});
	});

	describe("loading", () => {
		it("displays a spinner when loading", () => {
			let $tree = render({
				isLoginPending: true
			});

			chai.expect($tree.find(".spinner").length).to.equal(1);
		});
	});

	describe("expecting pin", () => {
		it("displays an input for pin when expecting a pin", () => {
			let $tree = render({
				waitingForPin: true
			});

			chai.expect($tree.find("input.pin").length).to.equal(1);
		});
	});

	describe("logged in", () => {
		it("displays an avatar, the user name, the refresh and logout buttons when logged in", () => {
			let $tree = render({
				isLogged: true,
				name: "Benjamin Van Ryseghem"
			});

			chai.expect($tree.find("img.avatar").length).to.equal(1);
			chai.expect($tree.find(".name").text()).to.equal("Benjamin Van Ryseghem");
			chai.expect($tree.find("button.refresh").length).to.equal(1);
			chai.expect($tree.find("button.logout").length).to.equal(1);
		});
	});
});
