import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { notifyVote, clearNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

var timeoutID;
const AnecdoteList = (props) => {
	const anecdotes = props.anecdotes;
	const filter = props.filter;

	const handleVote = (anecdote) => {
		if (timeoutID !== null) {
			window.clearTimeout(timeoutID);
		}
		props.vote(anecdote.id);
		props.notifyVote(anecdote.content);
		timeoutID = setTimeout(() => {
			props.clearNotification();
			timeoutID = null;
		}, 5000);
	};

	return (
		<div>
			{anecdotes
				.filter((x) => new RegExp(filter, "i").test(x.content))
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
					</div>
				))}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdote,
		filter: state.filter,
	};
};

const mapDispatchToProps = {
	vote,
	notifyVote,
	clearNotification,
};

const ConnectedAnecodteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecodteList;
