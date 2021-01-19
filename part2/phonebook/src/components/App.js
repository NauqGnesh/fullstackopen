import React, { useState, useEffect } from "react";
import Page from "./Page";
import personServices from "../services";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		console.log("effect");
		personServices.getAll().then((response) => {
			console.log("promise fulfilled");
			setPersons(response);
			console.log(persons);
		});
	}, []);

	const handleNewInput = (type) => {
		switch (type) {
			case "name":
				return (e) => setNewName(e.target.value);
			case "number":
				return (e) => setNewNumber(e.target.value);
			case "filter":
				return (e) => setFilter(e.target.value);
			default:
				console.log("invalid argument");
		}
	};

	const createNewEntry = () => {
		const obj = { name: newName, number: newNumber };
		personServices
			.create(obj)
			.then((response) => {
				setPersons([...persons, response]);
				setError(`Added ${obj.name}`);
				setSuccess(true);
			})
			.catch((body) => {
				console.log(body.response.data);
				setError(`${body.response.data.error}`);
				setSuccess(false);
			});
	};

	const resetState = () => {
		setNewName("");
		setNewNumber("");
	};

	const handleNewPerson = (e) => {
		e.preventDefault();
		const filteredPersons = persons.filter((obj) => obj.name === newName);
		if (filteredPersons.length === 0) {
			createNewEntry();
		} else {
			const p = filteredPersons[0];
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personServices
					.update(p.id, { ...p, number: newNumber })
					.then((response) =>
						setPersons(
							persons.map((person) => (person.id !== p.id ? person : response))
						)
					)
					.catch((error) => {
						console.log(error);
					});
			}
			setError(`Updated contact details of ${p.name}`);
			setSuccess(true);
		}
		resetState();
	};

	const deleteHandler = (obj) => {
		return () => {
			if (window.confirm(`Delete ${obj.name}`)) {
				let flag = true;
				console.log(obj);
				personServices
					.remove(obj.id)
					.catch((err) => {
						console.log(err);
						flag = false;
						setError("Person was already deleted");
						setSuccess(false);
					})
					.finally(() => {
						if (flag) {
							setPersons(persons.filter((p) => p.id !== obj.id));
							setError(`Deleted ${obj.name}`);
							setSuccess(false);
						}
					});
			}
		};
	};

	const messageType = (message) => {
		console.log(success);
		if (success) {
			return <div className={"error success"}>{message}</div>;
		}

		return <div className="error">{message}</div>;
	};

	return (
		<div>
			<Page
				newName={newName}
				inputHandler={handleNewInput}
				buttonHandler={handleNewPerson}
				deleteHandler={deleteHandler}
				persons={persons}
				errorMessage={error}
				messageType={messageType}
				filter={filter}
			/>
		</div>
	);
};

export default App;
