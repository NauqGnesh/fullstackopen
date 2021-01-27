const initialNotification = null;

const reducer = (state = initialNotification, action) => {
	console.log("state now: ", state);
	console.log("action", action);
	switch (action.type) {
		case "NOTIFY_VOTE": {
			return action.data.anecdote === null
				? null
				: `You voted '${action.data.anecdote}'`;
		}

		case "NOTIFY_NEW": {
			return action.data.anecdote === null
				? null
				: `You created '${action.data.anecdote}'`;
		}

		default:
			return state;
	}
};

export const notifyVote = (anecdote) => {
	console.log("vote", anecdote);
	return {
		type: "NOTIFY_VOTE",
		data: {
			anecdote: anecdote,
		},
	};
};

export const notifyNewAnecdote = (anecdote) => {
	return {
		type: "NOTIFY_NEW",
		data: {
			anecdote: anecdote,
		},
	};
};

export const clearNotification = () => {
	console.log("Clearing nortification");
	return {
		type: "NOTIFY_NEW",
		data: {
			anecdote: null,
		},
	};
};

export default reducer;
