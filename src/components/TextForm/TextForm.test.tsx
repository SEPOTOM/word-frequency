import { render, screen } from '@testing-library/react';

import TextForm from './TextForm';

describe('TextForm', () => {
  it('should display a text input field', () => {
    render(<TextForm />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
