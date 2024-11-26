import { FrequencyDatum } from '@/types';

export const shortenResult = (
  fullResult: FrequencyDatum[],
  neededLength: number,
): FrequencyDatum[] => {
  if (fullResult.length <= neededLength) {
    return fullResult;
  }

  const shortenedResult = [...fullResult];
  const processedRepetitions = new Set<number>();

  while (shortenedResult.length > neededLength) {
    const datumToDeleteIndex = shortenedResult.findLastIndex(
      (datum) => !processedRepetitions.has(datum.repetitionsAmount),
    );
    const datumToDelete = shortenedResult[datumToDeleteIndex];

    const similarDatum = shortenedResult.findLast(
      (datum, index) =>
        index < datumToDeleteIndex &&
        datumToDelete.repetitionsAmount === datum.repetitionsAmount,
    );

    if (similarDatum) {
      similarDatum.entity += `, ${datumToDelete.entity}`;
      shortenedResult.splice(datumToDeleteIndex, 1);
    } else {
      processedRepetitions.add(datumToDelete.repetitionsAmount);
    }
  }

  return shortenedResult;
};
