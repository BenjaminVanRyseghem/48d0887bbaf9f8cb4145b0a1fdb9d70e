import React from "react"; // eslint-disable-line no-unused-vars
import {render} from "react-dom";
import {Provider} from "react-redux"; // eslint-disable-line no-unused-vars
import {createStore} from "redux";
import application from "./reducers";

const store = createStore(application);

render(
	<Provider store={store}>
	</Provider>,
	document.getElementById("application-root")
);
