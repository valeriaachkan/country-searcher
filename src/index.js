import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import countryListTmpl from './templates/country-list.hbs';
import countryInfoTmpl from './templates/country-info.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
	searchInput: document.querySelector('input#search-box'),
	countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
	e.preventDefault();

	const query = e.target.value.trim();
	if (query === '') {
		clearDOM();
		return;
	}

	fetchCountries(query)
		.then((data) =>
			data.length <= 10 && data.length >= 2
				? renderCountryList(data)
				: data.length === 1
				? renderCountry(data)
				: data.length > 10
				? onManyMatches()
				: onFetchError()
		)
		.catch(onFetchError);
}

function renderCountry(data) {
	const markup = countryInfoTmpl(data);
	refs.countryInfo.innerHTML = markup;
}
function renderCountryList(data) {
	const markup = countryListTmpl(data);
	refs.countryInfo.innerHTML = markup;
}
function clearDOM() {
    refs.countryInfo.innerHTML = '';
}

function onFetchError() {
    clearDOM();
    Notify.failure('Oops, there is no country with that name', {
        timeout: 1000,
        showOnlyTheLastOne: true,
    });
}

function onManyMatches() {
    clearDOM();
    Notify.info('Too many matches found. Please enter a more specific name.', {
        timeout: 1000,
        showOnlyTheLastOne: true,
    });
}