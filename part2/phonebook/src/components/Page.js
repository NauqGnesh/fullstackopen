import React from "react";
import personServices from "../services";

const Header = ({ text }) => <h2>{text}</h2>;
const Button = ({ text, handler }) => {
	return (
		<div>
			<button onClick={handler}>{text}</button>
		</div>
	);
};

const Input = ({ text, value, handler }) => {
	return (
		<div>
			{text}: <input value={value} onChange={handler} />
		</div>
	);
};

const Entry = (props) => {
	return (
		<div>
			{props.obj.name} {props.obj.number}
			<Button text="delete" handler={props.deleteHandler(props.obj)} />
		</div>
	);
};

const Form = (props) => {
	return (
		<form>
			<Input
				text="name"
				value={props.newName}
				handler={props.inputHandler("name")}
			/>
			<Input
				text="number"
				value={props.newNumber}
				handler={props.inputHandler("number")}
			/>
			<Button text="add" handler={props.buttonHandler} />
		</form>
	);
};

const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return type(message);
};

const Page = (props) => {
	return (
		<div>
			<Header text="Phonebook" />
			<Notification
				message={props.errorMessage}
				type={props.messageType}
			/>

			<Input
				text="filter shown with"
				value={props.filter}
				handler={props.inputHandler("filter")}
			/>
			<Header text="add a new" />
			<Form
				newName={props.newName}
				inputHandler={props.inputHandler}
				buttonHandler={props.buttonHandler}
			/>
			<h2>Numbers</h2>
			{props.persons
				.filter((x) => new RegExp(props.filter, "i").test(x.name))
				.map((x) => (
					<Entry
						key={x.name}
						obj={x}
						deleteHandler={props.deleteHandler}
					/>
				))}
		</div>
	);
};

export default Page;
