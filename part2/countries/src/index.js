import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

const Input = ({ text, value, handler }) => {
	return (
		<div>
			{text}: <input value={value} onChange={handler} />
		</div>
	);
};

const Display = (props) => {
	return (
		<div>
			{props.text} {props.description}
		</div>
	);
};

const Details = ({ country }) => {
	return (
		<div>
			<Display text="capital" description={country.capital} />
			<Display text="population" description={country.population} />
			<h3>languages</h3>
			<ul>
				{country.languages.map((x) => (
					<li>
						<Display key={x.iso639_1} text={x.name} />
					</li>
				))}
			</ul>
			<img
				src={country.flag}
				alt={`${country.name} national flag`}
				height={100}
				width={80}
			/>
		</div>
	);
};

const Button = ({ text, handler }) => {
	return (
		<div>
			<button onClick={handler}>{text}</button>
		</div>
	);
};

const Query = ({ countries, filter, setSearch }) => {
	const filteredCountries = countries.filter((c) =>
		new RegExp(filter, "i").test(c.name)
	);
	console.log(filteredCountries);

	if (filteredCountries.length > 10) {
		return "Too many mataches, specify another filter";
	} else if (filteredCountries.length === 0) {
		return "No matches, try another filter";
	} else if (filteredCountries.length === 1) {
		const country = filteredCountries[0];
		console.log(country.languages);
		return (
			<div>
				<Details country={country} />
			</div>
		);
	} else {
		return (
			<div>
				{filteredCountries.map((x) => (
					<div>
						<Display key={x.name} text={x.name} />
						<Button
							text="show"
							handler={() => {
								setSearch(x.name);
							}}
						/>
					</div>
				))}
			</div>
		);
	}
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const handleNewSearch = (e) => {
		console.log(e.target.value);
		setSearch(e.target.value);
	};

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			console.log("promise fulfilled");
			setCountries(response.data);
		});
	}, []);

	console.log(countries);
	return (
		<div>
			<Input
				text="find countries"
				value={search}
				handler={handleNewSearch}
			/>
			<Query
				countries={countries}
				filter={search}
				setSearch={setSearch}
			/>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
