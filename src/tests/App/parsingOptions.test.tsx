import { render, screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests/utils';
import { ParsingOptions } from '@/types';

describe('Parsing option should have correct default values', () => {
  it('caseSensitive should be checked', () => {
    const optionName = 'caseSensitive' satisfies keyof ParsingOptions;
    render(<App />);

    expect(screen.getByRole('checkbox', { name: optionName })).toBeChecked();
  });

  it('lettersOnly should be unchecked', () => {
    const optionName = 'lettersOnly' satisfies keyof ParsingOptions;
    render(<App />);

    expect(
      screen.getByRole('checkbox', { name: optionName }),
    ).not.toBeChecked();
  });
});

describe('App', () => {
  it('should ignore the case of words when the caseSensitive is unchecked', async () => {
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
