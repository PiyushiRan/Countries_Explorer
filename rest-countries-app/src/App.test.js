import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App Integration Tests', () => {
  afterEach(() => {
    localStorage.clear();
    document.body.className = ''; // Reset body class after each test
  });

  test('renders landing page on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /welcome to earthcompass/i })
    ).toBeInTheDocument();
  });

  test('renders Home page with theme toggle and navigation', () => {
    localStorage.setItem('user', 'Alice');
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    // Home page should render with Navbar
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();

    // Toggle to dark theme
    const toggleButton = screen.getByRole('button', { name: /dark mode/i });
    fireEvent.click(toggleButton);
    expect(document.body.className).toContain('bg-dark');

    // Toggle back to light
    const lightToggle = screen.getByRole('button', { name: /light mode/i });
    fireEvent.click(lightToggle);
    expect(document.body.className).toContain('bg-light');
  });

  test('renders Favorites page when navigated', async () => {
    localStorage.setItem('user', 'Bob');
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
  });

  test('renders Login page when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('does not show navbar on landing and login pages', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('logout clears user and redirects to landing page', () => {
    localStorage.setItem('user', 'Charlie');
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('user')).toBe(null);
    expect(
      screen.getByRole('heading', { name: /welcome to earthcompass/i })
    ).toBeInTheDocument();
  });
});
