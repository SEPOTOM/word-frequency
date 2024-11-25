import { render, screen } from '@testing-library/react';

import { renderWithUser } from '@/tests';
import { ParsingOptions } from '@/types';

import App from './App';

describe('App', () => {
  it('should properly calculate and display the number of repetitions for a word sequence', async () => {
    const testText = 'work test add test work add add test';
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), testText);
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getByRole('row', { name: /work 2/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /test 3/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /add 3/i })).toBeInTheDocument();
  });

  it("shouldn't display any table rows on the initial load", () => {
    render(<App />);

    expect(screen.queryAllByRole('row').length).toBe(0);
  });

  it('should display words frequency in the descending order by default', async () => {
    const testText = 'one two two three three three';
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), testText);
    await user.click(screen.getByRole('button', { name: /translate/i }));

    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveTextContent(/3/i);
    expect(rows[1]).toHaveTextContent(/2/i);
    expect(rows[2]).toHaveTextContent(/1/i);
  });

  it('should ignore punctuation marks by default', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('textbox'), 'This!? is — a :test…');
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getByRole('cell', { name: 'This' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'is' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'a' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'test' })).toBeInTheDocument();
  });

  describe('should have correct default parsing options', () => {
    it('case sensitive should be checked', () => {
      const optionName = 'caseSensitive' satisfies keyof ParsingOptions;
      render(<App />);

      expect(screen.getByRole('checkbox', { name: optionName })).toBeChecked();
    });

    it('letters only should be checked', () => {
      const optionName = 'lettersOnly' satisfies keyof ParsingOptions;
      render(<App />);

      expect(
        screen.getByRole('checkbox', { name: optionName }),
      ).not.toBeChecked();
    });
  });

  describe('parsing options', () => {
    it('should ignore the case of words when the case sensitive is unchecked', async () => {
      const optionName = 'caseSensitive' satisfies keyof ParsingOptions;
      const { user } = renderWithUser(<App />);

      await user.click(screen.getByRole('checkbox', { name: optionName }));
      await user.type(screen.getByRole('textbox'), 'word WORD wORd');
      await user.click(screen.getByRole('button', { name: /translate/i }));

      expect(screen.getByRole('row', { name: /word 3/ })).toBeInTheDocument();
    });

    it('should calculate the number of each letter when the lettersOnly is checked', async () => {
      const optionName = 'lettersOnly' satisfies keyof ParsingOptions;
      const { user } = renderWithUser(<App />);

      await user.click(screen.getByRole('checkbox', { name: optionName }));
      await user.type(screen.getByRole('textbox'), 'test message');
      await user.click(screen.getByRole('button', { name: /translate/i }));

      expect(screen.getAllByRole('row').length).toBe(6);
      expect(screen.getByRole('row', { name: /t 2/ })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /e 3/ })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /s 3/ })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /m 1/ })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /a 1/ })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /g 1/ })).toBeInTheDocument();
    });
  });
});
