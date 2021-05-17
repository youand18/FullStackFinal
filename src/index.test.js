import { render, screen } from '@testing-library/react';
import Board from './index';
import Header from './index';
import Instructions from './index';
import Credits from './index';
import Game from './index';
  
  test('Header test', () => {
    render(<Header />);
    const heading = screen.getByText(/Connect Four!/i);
    expect(heading).toBeInTheDocument();
  });
  test('Instructions test', () => {
    render(<Instructions />);
    const heading = screen.getByText(/- Red plays first, picking a square to change to their color/i);
    expect(heading).toBeInTheDocument();
  });
  test('Credits test', () => {
    render(<Credits />);
    const heading = screen.getByText(/Made by David Sanders for CSCI 310: JavaScript/i);
    expect(heading).toBeInTheDocument();
  });
  test('Board test', () => {
    render(<Board />);
    const heading = screen.getByText(/Nexter player: Red/i);
    expect(heading).toBeInTheDocument();
  });
  test('Game test', () => {
    render(<Game />);
    const heading = screen.getByText(/Connect Four!/i);
    expect(heading).toBeInTheDocument();
  });