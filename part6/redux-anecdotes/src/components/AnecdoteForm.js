import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	notifyNewAnecdote,
	clearNotification,
} from "../reducers/notificationReducer";

var timeoutID;
const AnecdoteForm = (props) => {
	const handleNewAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		props.createAnecdote(content);
		if (timeoutID !== null) {
			window.clearTimeout(timeoutID);
		}
		props.notifyNewAnecdote(content);
		timeoutID = setTimeout(() => {
			props.clearNotification();
			timeoutID = null;
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleNewAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	createAnecdote,
	notifyNewAnecdote,
	clearNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
