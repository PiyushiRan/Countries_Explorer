import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

test('renders region filter dropdown', () => {
  render(<FilterBar onFilterChange={() => {}} />);
  
  // Get the region filter by name (filter by region)
  const regionSelect = screen.getByRole('combobox', { name: /filter by region/i });
  expect(regionSelect).toBeInTheDocument();
  
  // Get the language filter by name (filter by language)
  const languageSelect = screen.getByRole('combobox', { name: /filter by language/i });
  expect(languageSelect).toBeInTheDocument();
});

test('calls onFilterChange with selected region and language', () => {
  const mockFilter = jest.fn();
  render(<FilterBar onFilterChange={mockFilter} />);
  
  // Select a region
  fireEvent.change(screen.getByRole('combobox', { name: /filter by region/i }), { target: { value: 'Asia' } });
  
  // Select a language
  fireEvent.change(screen.getByRole('combobox', { name: /filter by language/i }), { target: { value: 'English' } });
  
  // Check if both region and language are passed to onFilterChange
  expect(mockFilter).toHaveBeenCalledWith({ region: 'Asia', language: 'English' });
});
