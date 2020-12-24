import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
	return <h1> {props.course} </h1>;
};

const Part = (props) => {
	return (
		<p>
			{props.excerciseName} {props.exerciseNum}
		</p>
	);
};

const Total = (props) => {
	return <p>Number of exercises {props.total}</p>;
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	let sum = 0;
	course.parts.forEach((part) => (sum += part.exercises));

	return (
		<div>
			<Header course={course.name} />
			<Part
				excerciseName={course.parts[0].name}
				exerciseNum={course.parts[0].exercises}
			/>
			<Part
				excerciseName={course.parts[1].name}
				exerciseNum={course.parts[1].exercises}
			/>
			<Part
				excerciseName={course.parts[2].name}
				exerciseNum={course.parts[2].exercises}
			/>
			<Total total={sum} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
