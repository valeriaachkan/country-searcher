const BASE_URL = 'https://restcountries.com/v2';
const filterFields = 'fields=name,capital,population,flags,languages';

// export default function fetchCountries(country) {
// 	return fetch(`${BASE_URL}/name/${country}?${filterFields}`).then(
// 		(response) => {
// 			if (!response.ok) {
// 				throw new Error(response.status);
// 			}

// 			return response.json();
// 		}
// 	);
// }

export default async function fetchCountries(query) {

	const response = await fetch(`${BASE_URL}/name/${query}?${filterFields}`);
	const data = await response.json();

	console.log(data);
	return data;
}