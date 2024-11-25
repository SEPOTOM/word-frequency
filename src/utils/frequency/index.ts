import { FrequencyDatum } from '@/types';

export const shortenResult = (
  fullResult: FrequencyDatum[],
  neededLength: number,
): FrequencyDatum[] => {
  if (fullResult.length <= neededLength) {
    return fullResult;
  }

  const shortenedResult = [...fullResult];

  while (shortenedResult.length > neededLength) {
    const deletedDatum = shortenedResult.pop();
    const lastDatum = shortenedResult.at(-1);

    if (lastDatum) {
      lastDatum.entity += `, ${deletedDatum?.entity}`;
    }
  }

  return shortenedResult;
};
