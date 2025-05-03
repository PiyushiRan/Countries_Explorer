import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders the search input', () => {
  render(<SearchBar onSearch={() => {}} />);
  const inputElement = screen.getByPlaceholderText(/search by country name/i);
  expect(inputElement).toBeInTheDocument();
});

test('calls onSearch when typing', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);
  const input = screen.getByPlaceholderText(/search by country name/i);
  fireEvent.change(input, { target: { value: 'India' } });
  expect(mockSearch).toHaveBeenCalledWith('India');
});
