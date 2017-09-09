import "babel-polyfill";
import React from "react"; // eslint-disable-line no-unused-vars
import {render} from "react-dom";
import {Provider} from "react-redux"; // eslint-disable-line no-unused-vars
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import application from "./reducers";
import mySaga from "./saga";
import App from "./components/App"; // eslint-disable-line no-unused-vars
import "isomorphic-fetch";

let preloadedState = {};

const sagaMiddleware = createSagaMiddleware();
let initialData = window.initialData;

if (initialData.id) {
	preloadedState = {
		isLogged: true,
		userId: initialData.id,
		screenName: initialData.screen_name,
		name: initialData.name,
		picture: initialData.profile_image_url,
		tweets: []
	};
}

const store = createStore(
	application,
	preloadedState,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("application-root")
);
