import { FrequencyDatum } from '@/types';

import { shortenResult } from './index';

describe('shortenResult', () => {
  it('should return the same array if its length is less than needed', () => {
    const input: [FrequencyDatum[], number] = [
      [{ entity: 'Test', repetitionsAmount: 2 }],
      2,
    ];

    const result = shortenResult(...input);

    expect(result).toBe(input[0]);
  });
});
