import { render, screen } from '@testing-library/react';

import App from '@/App';

import { renderWithUser } from '../utils';

describe('App', () => {
  it("shouldn't display any table rows on the initial load", () => {
    render(<App />);

    expect(screen.queryAllByRole('row').length).toBe(0);
  });

  it('should properly calculate and display the number of repetitions for a word sequence', async () => {
    const testText = 'work test add test work add add test';
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), testText);
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getByRole('row', { name: /work 2/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /test 3/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /add 3/i })).toBeInTheDocument();
  });

  it('should display words frequency in the descending order', async () => {
    const testText = 'one two two three three three';
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), testText);
    await user.click(screen.getByRole('button', { name: /translate/i }));

    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveTextContent(/3/i);
    expect(rows[1]).toHaveTextContent(/2/i);
    expect(rows[2]).toHaveTextContent(/1/i);
  });

  it('should ignore punctuation marks', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), 'This!? is — a :test…');
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getByRole('cell', { name: 'This' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'is' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'a' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'test' })).toBeInTheDocument();
  });
});
