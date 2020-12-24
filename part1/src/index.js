import React, { useState } from "react";
import ReactDOM from "react-dom";
//Components
const Header = ({ title }) => {
	return <h1> {title} </h1>;
};

const average = (good, neutral, bad) => {
	return (good - bad) / (good + neutral + bad);
};

const positive = (good, neutral, bad) => {
	return (good * 100.0) / (good + neutral + bad) + "%";
};

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad, text }) => {
	if (good + neutral + bad === 0) {
		return <p>No feedback given</p>;
	}

	return (
		<table>
			<Statistic text="good" value={good} />
			<Statistic text="neutral" value={neutral} />
			<Statistic text="bad" value={bad} />
			<Statistic text="all" value={good + neutral + bad} />
			<Statistic text="average" value={average(good, neutral, bad)} />
			<Statistic text="positive" value={positive(good, neutral, bad)} />
		</table>
	);
};

const Button = ({ text, handler }) => {
	return (
		<div>
			<button onClick={handler}>{text}</button>
		</div>
	);
};

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(
		new Array(props.anecdotes.length).fill(0)
	);

	const randomNumber = () => {
		return Math.floor(Math.random() * props.anecdotes.length);
	};

	const nextAnecdote = () => {
		const val = randomNumber();
		setSelected(val);
	};

	const voteHandler = () => {
		let aux = [...votes];
		aux[selected] += 1;
		setVotes(aux);
	};

	const mostVotes = votes.indexOf(Math.max(...votes));

	return (
		<div>
			<Header title="Anecdote of the day" />
			{props.anecdotes[selected]}
			<br />
			{`has ${votes[selected]} votes`}
			<Button text="vote" handler={voteHandler} />
			<Button text="next anectdote" handler={nextAnecdote} />
			<Header title="Anecdote with most votes" />
			{props.anecdotes[mostVotes]}
			<br />
			{`has ${votes[mostVotes]} votes`}
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

// part a & b
// const App = () => {
//     const course = {
//         name: "Half Stack application development",
//         parts: [
//             {
//                 name: "Fundamentals of React",
//                 exercises: 10,
//             },
//             {
//                 name: "Using props to pass data",
//                 exercises: 7,
//             },
//             {
//                 name: "State of a component",
//                 exercises: 14,
//             },
//         ],
//     };
//
//     let sum = 0;
//     course.parts.forEach((part) => (sum += part.exercises));
//
//     return (
//         <div>
//             <Header course={course.name} />
//             <Part
//                 excetilterciseName={course.parts[0].name}
//                 exerciseNum={course.parts[0].exercises}
//             />
//             <Part
//                 excerciseName={course.parts[1].name}
//                 exerciseNum={course.parts[1].exercises}
//             />
//             <Part
//                 excerciseName={course.parts[2].name}
//                 exerciseNum={course.parts[2].exercises}
//             />
//             <Total total={sum} />
//         </div>
//     );
// };

// const App = () => {
//     // save clicks of each button to its own state
//     const [good, setGood] = useState(0);
//     const [neutral, setNeutral] = useState(0);
//     const [bad, setBad] = useState(0);
//
//     //event handlers for feedback button
//     function handleFeedbackButton(feedbackType) {
//         if (feedbackType === "good") {
//             return () => {
//                 const counter = good + 1;
//                 setGood(counter);
//             };
//         }
//
//         if (feedbackType === "neutral") {
//             return () => {
//                 const counter = neutral + 1;
//                 setNeutral(counter);
//             };
//         }
//
//         if (feedbackType === "bad") {
//             return () => {
//                 const counter = bad + 1;
//                 setBad(counter);
//             };
//         }
//     }
//
//     return (
//         <div>
//             <Header title={"Give feedback"} />
//             <Button text="good" handler={handleFeedbackButton("good")} />
//             <Button text="neutral" handler={handleFeedbackButton("neutral")} />
//             <Button text="bad" handler={handleFeedbackButton("bad")} />
//             <Header title={"Statistics"} />
//             <Statistics good={good} neutral={neutral} bad={bad} />
//         </div>
//     );
// };
//
