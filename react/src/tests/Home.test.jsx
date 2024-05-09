import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Component', () => {
	it('renders without crashing', () => {
		render(<Home />);
	});

	it('displays correct header text', () => {
		const { getByText } = render(<Home />);
		expect(getByText('Find Your Dream Job With StudentGeoJobSearch')).toBeInTheDocument();
	});

	it('renders job title input field properly', () => {
		const { getByPlaceholderText } = render(<Home />);
		expect(getByPlaceholderText('Search by job title')).toBeInTheDocument();
	});

	it('navigates to job page on search button click', () => {
		const { container } = render(<Home />);
		const searchClicker = container.querySelector('.home__search-clicker');
		if (!searchClicker) {
			throw new Error('.home__search-clicker element not found');
		}

		const originalHref = window.location.href;

		fireEvent.click(searchClicker);

		expect(window.location.pathname).toBe('/jobs');
		// reset window location
		window.location.href = originalHref;
	})
});