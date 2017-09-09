import reducers from "../../../browser/reducers";
import React, {Component} from "react"; // eslint-disable-line no-unused-vars
import {Provider} from "react-redux"; // eslint-disable-line no-unused-vars
import {createStore} from "redux";
import teaspoon from "teaspoon";
import {JSDOM} from "jsdom";

const doc = new JSDOM("<!doctype html><html><body></body></html>");
const win = doc.window;

global.window = win;
global.document = win.document;

Object.keys(window).forEach((key) => {
	if (!(key in global)) {
		global[key] = window[key];
	}
});


function renderComponent(ComponentClass, props = {}, state = {}, returnStore = false, shallow = false) {
	const store = createStore(reducers, state);
	const log = [];

	class Tester extends Component { // eslint-disable-line no-unused-vars
		constructor(newProps) {
			super(newProps);
			this.state = newProps;
		}

		componentWillReceiveProps(newProps) {
			if (newProps !== this.props) {
				this.setState(newProps);
			}
		}

		render() {
			return (
				<Provider store={store}>
					<ComponentClass {...this.state} />
				</Provider>
			);
		}
	}


	let ret;

	if (shallow) {
		ret = teaspoon(<Tester {...props}/>).shallowRender();
	} else {
		ret = teaspoon(<Tester {...props}/>).render();
	}

	if (returnStore) {
		return [ret, store, log];
	}
	return ret;
}

export default renderComponent;

