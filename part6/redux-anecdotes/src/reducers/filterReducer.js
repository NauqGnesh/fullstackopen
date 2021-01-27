const initialFilter = "";

const reducer = (state = initialFilter, action) => {
	console.log("state now: ", state);
	console.log("action", action);
	switch (action.type) {
		case "NEW_FILTER": {
			return action.data.filter;
		}

		default:
			return state;
	}
};

export const updateFilter = (filter) => {
	console.log("filter", filter);
	return {
		type: "NEW_FILTER",
		data: {
			filter: filter,
		},
	};
};

export default reducer;
