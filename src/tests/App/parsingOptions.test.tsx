import { render, screen } from '@testing-library/react';

import App from '@/App';
import { OPTIONS_NAMES } from '@/components/ParsingOptionsPanel/consts';
import { renderWithUser } from '@/tests/utils';

describe('Parsing options', () => {
  describe('should have correct default values', () => {
    it('caseSensitive should be checked', () => {
      const optionName = OPTIONS_NAMES.caseSensitive;
      render(<App />);

      expect(screen.getByRole('checkbox', { name: optionName })).toBeChecked();
    });

    it('lettersOnly should be unchecked', () => {
      const optionName = OPTIONS_NAMES.lettersOnly;
      render(<App />);

      expect(
        screen.getByRole('checkbox', { name: optionName }),
      ).not.toBeChecked();
    });

    it('symbolsOnly should be unchecked', () => {
      const optionName = OPTIONS_NAMES.symbolsOnly;
      render(<App />);

      expect(
        screen.getByRole('checkbox', { name: optionName }),
      ).not.toBeChecked();
    });
  });

  describe('should disable conflict options when checked', () => {
    it('lettersOnly', async () => {
      const { user } = renderWithUser(<App />);

      await user.click(
        screen.getByRole('checkbox', { name: OPTIONS_NAMES.lettersOnly }),
      );

      expect(
        screen.getByRole('checkbox', { name: OPTIONS_NAMES.symbolsOnly }),
      ).toBeDisabled();
    });

    it('symbolsOnly', async () => {
      const { user } = renderWithUser(<App />);

      await user.click(
        screen.getByRole('checkbox', { name: OPTIONS_NAMES.symbolsOnly }),
      );

      expect(
        screen.getByRole('checkbox', { name: OPTIONS_NAMES.lettersOnly }),
      ).toBeDisabled();
    });
  });
});

describe('App', () => {
  it('should ignore the case of words when the caseSensitive is unchecked', async () => {
    const optionName = OPTIONS_NAMES.caseSensitive;
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('checkbox', { name: optionName }));
    await user.type(screen.getByRole('textbox'), 'word WORD wORd');
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getByRole('row', { name: /word 3/ })).toBeInTheDocument();
  });

  it('should calculate the number of each letter when the lettersOnly is checked', async () => {
    const optionName = OPTIONS_NAMES.lettersOnly;
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

  it('should calculate the number of non-words symbols when the symbolsOnly is checked', async () => {
    const optionName = OPTIONS_NAMES.symbolsOnly;
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('checkbox', { name: optionName }));
    await user.type(
      screen.getByRole('textbox'),
      'H! awg @ test.. Hello, Tom?!',
    );
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(screen.getAllByRole('row').length).toBe(5);
    expect(screen.getByRole('row', { name: /! 2/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /@ 1/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /\. 2/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /, 1/ })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /\? 1/ })).toBeInTheDocument();
  });

  it('should use a different separator for squashed data if the symbolsOnly is checked', async () => {
    const optionName = OPTIONS_NAMES.symbolsOnly;
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('checkbox', { name: optionName }));
    await user.type(
      screen.getByRole('textbox'),
      '!@#$%^&*()_+-=[[\\]{{\\}|;:\',.<>?/`~"',
    );
    await user.click(screen.getByRole('button', { name: /translate/i }));

    expect(
      screen.getByRole('row', { name: /\? \/ ` ~ " 1/ }),
    ).toBeInTheDocument();
  });
});
