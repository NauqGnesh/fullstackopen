import anecdoteServices from "../services/anecdotes";
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
	console.log("state now: ", state);
	console.log("action", action);
	switch (action.type) {
		case "VOTE": {
			const id = action.data.anecdote.id;

			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : action.data.anecdote
			);
		}

		case "NEW": {
			return state.concat(action.data.anecdote);
		}

		case "INIT_ANECDOTES": {
			return action.data;
		}

		default:
			return state;
	}
};

export const vote = (id) => {
	return async (dispatch) => {
		console.log("vote", id);
		const anecdotes = await anecdoteServices.getAll();

		const anecdoteToChange = anecdotes.find((n) => n.id === id);

		const changedAnecdote = await anecdoteServices.update(id, {
			...anecdoteToChange,
			votes: anecdoteToChange.votes + 1,
		});

		dispatch({
			type: "VOTE",
			data: {
				anecdote: changedAnecdote,
			},
		});
	};
};

export const createAnecdote = (anecdote) => {
	return async (dispatch) => {
		console.log("Creating new anecdote");
		const newAnecdote = await anecdoteServices.create(asObject(anecdote));

		dispatch({
			type: "NEW",
			data: {
				anecdote: newAnecdote,
			},
		});
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteServices.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes,
		});
	};
};

export default reducer;
