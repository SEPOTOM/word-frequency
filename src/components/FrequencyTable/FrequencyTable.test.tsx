import { render, screen, within } from '@testing-library/react';

import { FrequencyDatum } from '@/types';

import FrequencyTable from './FrequencyTable';

describe('FrequencyTable', () => {
  const fakeFrequencyDatum: FrequencyDatum = {
    repetitionsAmount: 2,
    entity: 'Test',
  };

  it('should display a table', () => {
    render(<FrequencyTable frequencyData={[fakeFrequencyDatum]} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display a caption', () => {
    render(<FrequencyTable frequencyData={[fakeFrequencyDatum]} />);

    expect(
      screen.getByRole('caption', { name: /frequency/i }),
    ).toBeInTheDocument();
  });

  it('should properly display the received frequency data', () => {
    const fakeFrequencyData: FrequencyDatum[] = [
      {
        entity: 'word',
        repetitionsAmount: 23,
      },
      {
        entity: 'Title',
        repetitionsAmount: 57,
      },
    ];
    render(<FrequencyTable frequencyData={fakeFrequencyData} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

    const firstRowCells = within(rows[0]).getAllByRole('cell');
    expect(firstRowCells.length).toBe(2);
    expect(firstRowCells[0]).toHaveTextContent('word');
    expect(firstRowCells[1]).toHaveTextContent('23');

    const secondRowCells = within(rows[1]).getAllByRole('cell');
    expect(secondRowCells.length).toBe(2);
    expect(secondRowCells[0]).toHaveTextContent('Title');
    expect(secondRowCells[1]).toHaveTextContent('57');
  });

  it('does not render anything when the received frequency data is empty', () => {
    render(<FrequencyTable frequencyData={[]} />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
