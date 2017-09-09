function loginReducer(state = {}, action) {
	let newState;
	switch (action.type) {
		case "LOGIN_PENDING": {
			newState = Object.assign({}, state, {
				isLoginPending: true,
				isLogged: false,
				waitingForPin: false
			});
			break;
		}
		case "WAITING_FOR_PIN": {
			newState = Object.assign({}, state, {
				isLoginPending: false,
				isLogged: false,
				waitingForPin: true
			});
			break;
		}
		case "CONFIRM_LOGIN": {
			newState = Object.assign({}, state, {
				isLoginPending: false,
				isLogged: true,
				waitingForPin: false,
				tweets: [],
				userId: action.value.id,
				screenName: action.value.screen_name,
				name: action.value.name,
				picture: action.value.profile_image_url
			});
			break;
		}
		case "CHANGE_PIN": {
			newState = Object.assign({}, state, {
				pin: action.value
			});
			break;
		}
		case "CHANGE_TWEET": {
			newState = Object.assign({}, state, {
				status: action.value
			});
			break;
		}
		case "LOADING_TWEETS": {
			newState = Object.assign({}, state, {
				isLoading: true
			});
			break;
		}
		case "REFRESH_TWEETS": {
			newState = Object.assign({}, state, {
				isLoading: false,
				tweets: action.value
			});
			break;
		}
		case "RESET_TWEET": {
			newState = Object.assign({}, state, {
				status: ""
			});
			break;
		}
		case "LOGOUT": {
			newState = Object.assign({}, state, {
				isLoading: false,
				tweets: [],
				isLogged: false,
				userId: undefined,
				screenName: undefined,
				name: undefined,
				picture: undefined,
				pin: "",
				status: ""
			});
			break;
		}
		default: {
			newState = state;
		}
	}
	return newState;
}

export default loginReducer;
