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

  it('should return the same array if its length is equal to the needed one', () => {
    const input: [FrequencyDatum[], number] = [
      [{ entity: 'Test', repetitionsAmount: 2 }],
      1,
    ];

    const result = shortenResult(...input);

    expect(result).toBe(input[0]);
  });

  it('should return the shortened array if its length is too long', () => {
    const input: [FrequencyDatum[], number] = [
      [
        { entity: 'Test', repetitionsAmount: 2 },
        { entity: 'Word', repetitionsAmount: 2 },
      ],
      1,
    ];

    const result = shortenResult(...input);

    expect(result.length).toBe(1);
  });

  it('returns an array where the last element has all the squashed entities', () => {
    const input: [FrequencyDatum[], number] = [
      [
        { entity: 'Test', repetitionsAmount: 2 },
        { entity: 'Word', repetitionsAmount: 2 },
        { entity: 'Adam', repetitionsAmount: 2 },
        { entity: 'Pill', repetitionsAmount: 2 },
        { entity: 'Lipstick', repetitionsAmount: 2 },
      ],
      2,
    ];

    const result = shortenResult(...input);

    expect(result[1].entity).toBe('Word, Adam, Pill, Lipstick');
  });

  it("shouldn't mix elements with different amount of repetitions", () => {
    const input: [FrequencyDatum[], number] = [
      [
        { entity: 'Test', repetitionsAmount: 5 },
        { entity: 'Word', repetitionsAmount: 3 },
        { entity: 'Adam', repetitionsAmount: 3 },
        { entity: 'Pill', repetitionsAmount: 2 },
        { entity: 'Lipstick', repetitionsAmount: 2 },
      ],
      3,
    ];

    const result = shortenResult(...input);

    expect(result[1].entity).toBe('Word, Adam');
    expect(result[2].entity).toBe('Pill, Lipstick');
  });

  it("should return an array with a bigger length if there's no more elements to squash", () => {
    const input: [FrequencyDatum[], number] = [
      [
        { entity: 'Test', repetitionsAmount: 5 },
        { entity: 'Word', repetitionsAmount: 3 },
        { entity: 'Adam', repetitionsAmount: 3 },
        { entity: 'Pill', repetitionsAmount: 2 },
        { entity: 'Lipstick', repetitionsAmount: 1 },
      ],
      3,
    ];

    const result = shortenResult(...input);

    expect(result.length).toBe(4);
  });
});
