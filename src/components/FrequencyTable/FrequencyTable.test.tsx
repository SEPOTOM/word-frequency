import { render, screen } from '@testing-library/react';

import FrequencyTable from './FrequencyTable';

describe('FrequencyTable', () => {
  it('should display a table', () => {
    render(<FrequencyTable />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display a caption', () => {
    render(<FrequencyTable />);

    expect(
      screen.getByRole('caption', { name: /frequency/i }),
    ).toBeInTheDocument();
  });
});
