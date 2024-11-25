import { FrequencyDatum } from '@/types';

export const shortenResult = (
  fullResult: FrequencyDatum[],
  neededLength: number,
): FrequencyDatum[] => {
  if (fullResult.length <= neededLength) {
    return fullResult;
  }

  const shortenedResult = [...fullResult];
  shortenedResult.length = neededLength;

  return shortenedResult;
};
