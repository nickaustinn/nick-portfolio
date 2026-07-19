import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the site name in the nav', () => {
  render(<App />);
  const name = screen.getAllByText(/Nick Austin/i)[0];
  expect(name).toBeInTheDocument();
});
