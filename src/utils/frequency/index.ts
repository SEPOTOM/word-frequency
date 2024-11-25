import { FrequencyDatum } from '@/types';

export const shortenResult = (
  fullResult: FrequencyDatum[],
  neededLength: number,
) => {
  if (fullResult.length <= neededLength) {
    return fullResult;
  }
};
