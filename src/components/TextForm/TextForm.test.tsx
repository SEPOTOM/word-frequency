import { render, screen } from '@testing-library/react';

import { renderWithUser } from '@/tests';

import TextForm from './TextForm';

describe('TextForm', () => {
  it('should display a text input field', () => {
    render(<TextForm />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display a translate button', () => {
    render(<TextForm />);

    expect(
      screen.getByRole('button', { name: /translate/i }),
    ).toBeInTheDocument();
  });

  it('restricts input to a maximum of 2048 characters', async () => {
    const charsQuantity = 10;
    const { user } = renderWithUser(<TextForm maxChars={charsQuantity} />);
    const inputText = 'a'.repeat(charsQuantity);
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, inputText + 'b');

    expect(textarea).toHaveDisplayValue(inputText);
  });
});
