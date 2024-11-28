import { FrequencyDatum } from '@/types';

export const shortenResult = (
  fullResult: FrequencyDatum[],
  neededLength: number,
  separator = ', ',
): FrequencyDatum[] => {
  if (fullResult.length <= neededLength) {
    return fullResult;
  }

  const shortenedResult = [...fullResult];
  let datumToDeleteIndex = shortenedResult.length - 1;

  while (shortenedResult.length > neededLength && datumToDeleteIndex >= 0) {
    const datumToDelete = shortenedResult[datumToDeleteIndex];

    const similarDatum = shortenedResult.findLast(
      (datum, index) =>
        index < datumToDeleteIndex &&
        datumToDelete.repetitionsAmount === datum.repetitionsAmount,
    );

    if (similarDatum) {
      similarDatum.entity += `${separator}${datumToDelete.entity}`;
      shortenedResult.splice(datumToDeleteIndex, 1);
    }

    datumToDeleteIndex -= 1;
  }

  return shortenedResult;
};
