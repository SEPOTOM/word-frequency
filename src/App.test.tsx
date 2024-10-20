import { renderWithUser } from '@/tests';

import App from './App';
import { screen } from '@testing-library/react';

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
});
