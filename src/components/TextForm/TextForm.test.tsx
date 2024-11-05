import { render, screen } from '@testing-library/react';

import { renderWithUser } from '@/tests';

import TextForm from './TextForm';

describe('TextForm', () => {
  it('should display a text input field', () => {
    render(<TextForm maxChars={10} onSubmit={() => null} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display a translate button', () => {
    render(<TextForm maxChars={10} onSubmit={() => null} />);

    expect(
      screen.getByRole('button', { name: /translate/i }),
    ).toBeInTheDocument();
  });

  it('restricts input to a maximum of 2048 characters', async () => {
    const charsQuantity = 10;
    const { user } = renderWithUser(
      <TextForm maxChars={charsQuantity} onSubmit={() => null} />,
    );
    const inputText = 'a'.repeat(charsQuantity);
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, inputText + 'b');

    expect(textarea).toHaveDisplayValue(inputText);
  });

  it('should display an error message when the textbox is empty', () => {
    render(<TextForm maxChars={0} onSubmit={() => null} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  describe('characters counter', () => {
    it('should display the maximum chars limit by default', () => {
      const maxChars = 20;
      const maxCharsRegExp = new RegExp(`${maxChars}`, 'i');

      render(<TextForm maxChars={maxChars} onSubmit={() => null} />);

      expect(screen.getByRole('status')).toHaveTextContent(maxCharsRegExp);
    });

    it('should decrease the remaining character count when the user types', async () => {
      const maxChars = 15;
      const textForInput = 'test';
      const expectedCounterValue = maxChars - textForInput.length;
      const expectedCounterValueRegExp = new RegExp(
        `${expectedCounterValue}`,
        'i',
      );
      const { user } = renderWithUser(
        <TextForm maxChars={maxChars} onSubmit={() => null} />,
      );

      await user.type(screen.getByRole('textbox'), textForInput);

      expect(screen.getByRole('status')).toHaveTextContent(
        expectedCounterValueRegExp,
      );
    });

    it('should update the remaining character count after the user deletes characters', async () => {
      const expectedCounterValue = 14;
      const expectedCounterValueRegExp = new RegExp(
        `${expectedCounterValue}`,
        'i',
      );
      const { user } = renderWithUser(
        <TextForm maxChars={15} onSubmit={() => null} />,
      );

      await user.type(screen.getByRole('textbox'), 'test');
      await user.type(screen.getByRole('textbox'), '{backspace>3}');

      expect(screen.getByRole('status')).toHaveTextContent(
        expectedCounterValueRegExp,
      );
    });
  });
});
