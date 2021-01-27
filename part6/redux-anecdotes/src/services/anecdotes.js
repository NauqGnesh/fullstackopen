import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

async function create(newObject) {
	const response = await axios.post(baseUrl, newObject);
	return response.data;
}

function update(id, newObject) {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
}

export default { getAll, create, update };
