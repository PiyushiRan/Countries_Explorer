import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../components/CountryCard';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CountryCard', () => {
  const mockCountry = {
    cca3: 'IND',
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    population: 1393409038,
    flags: { svg: 'https://flagcdn.com/in.svg' },
  };

  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders basic country info', () => {
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    
    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.getByText(/Capital: New Delhi/i)).toBeInTheDocument();
    expect(screen.getByText(/Region: Asia/i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 1,393,409,038/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.svg);
  });

  test('renders minimal version when minimal prop is true', () => {
    render(<CountryCard country={mockCountry} minimal />, { wrapper: MemoryRouter });
    
    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.queryByText(/Capital: New Delhi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Region: Asia/i)).not.toBeInTheDocument();
  });

  test('toggles favorite status', () => {
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    const button = screen.getByRole('button', { name: /favorite/i });
    
    // Initial state (not favorite)
    expect(button).toHaveTextContent('🤍 Favorite');
    expect(button).toHaveClass('btn-outline-primary');
    
    // First click - add to favorites
    fireEvent.click(button);
    expect(button).toHaveTextContent('❤️ Remove');
    expect(button).toHaveClass('btn-danger');
    expect(JSON.parse(localStorage.getItem('favorites'))).toEqual(['IND']);
    
    // Second click - remove from favorites
    fireEvent.click(button);
    expect(button).toHaveTextContent('🤍 Favorite');
    expect(button).toHaveClass('btn-outline-primary');
    expect(JSON.parse(localStorage.getItem('favorites'))).toEqual([]);
  });

  test('shows as favorite if already in localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify(['IND']));
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    
    const button = screen.getByRole('button', { name: /remove/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('❤️ Remove');
    expect(button).toHaveClass('btn-danger');
  });

  test('navigates to country page when clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('article'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/country/IND');
  });

  test('applies dark theme when theme is dark in localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('dark-mode');
    expect(card).not.toHaveClass('light-mode');
  });

  test('applies light theme by default', () => {
    localStorage.removeItem('theme'); // Ensure no theme is set
    render(<CountryCard country={mockCountry} />, { wrapper: MemoryRouter });
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('light-mode');
    expect(card).not.toHaveClass('dark-mode');
  });
});