import { render, screen } from '@testing-library/react';
import App from './App'; // Adjust path as necessary

// Mocking the Home component if needed (optional, but useful for isolated testing)
jest.mock('./pages/Home', () => ({
  Home: () => <div>Home Component</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    // Check if the Home component is rendered
    expect(screen.getByText(/Home Component/i)).toBeInTheDocument();
  });

});
