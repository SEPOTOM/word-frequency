import { FrequencyDatum, ParsingOptions } from '@/types';
import { FREQUENCY_DATUM_AMOUNT, isLetter, shortenResult } from '@/utils';

import { IgnoreFunc } from './types';
import { calculateFrequency } from './utils';

const useWordsFrequency = (
  text: string,
  options?: ParsingOptions,
): FrequencyDatum[] => {
  let textParts: string[] = [];

  if (options?.symbolsOnly) {
    textParts = text.match(/[^\w\s]/g) ?? [];
  } else {
    const separator = options?.lettersOnly ? '' : /[\s\p{P}]+/u;

    textParts = text.split(separator);
  }

  if (!options?.caseSensitive) {
    textParts = textParts.map((part) => part.toLowerCase());
  }

  let shouldIgnoreTextPart: Nullable<IgnoreFunc> = null;

  if (options?.lettersOnly) {
    shouldIgnoreTextPart = (part: string) => !isLetter(part);
  }

  const result = calculateFrequency(textParts, shouldIgnoreTextPart);
  const sortedResult = result.sort(
    (a, b) => b.repetitionsAmount - a.repetitionsAmount,
  );

  const squashedTextPartsSeparator = options?.symbolsOnly ? ' ' : ', ';

  return shortenResult(
    sortedResult,
    FREQUENCY_DATUM_AMOUNT,
    squashedTextPartsSeparator,
  );
};

export default useWordsFrequency;
