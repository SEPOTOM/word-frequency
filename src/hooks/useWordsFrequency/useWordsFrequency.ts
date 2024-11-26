import { FrequencyDatum, ParsingOptions } from '@/types';
import { FREQUENCY_DATUM_AMOUNT, isLetter, shortenResult } from '@/utils';

import { IgnoreFunc } from './types';
import { calculateFrequency } from './utils';

const useWordsFrequency = (
  text: string,
  options?: ParsingOptions,
): FrequencyDatum[] => {
  const separator = options?.lettersOnly ? '' : /[\s\p{P}]+/u;

  let words: string[] | Set<string> = text.split(separator);

  if (!options?.caseSensitive) {
    words = words.map((word) => word.toLowerCase());
  }

  let shouldIgnoreWord: Nullable<IgnoreFunc> = null;

  if (options?.lettersOnly) {
    shouldIgnoreWord = (word: string) => !isLetter(word);
  }

  const result = calculateFrequency(words, shouldIgnoreWord);
  const sortedResult = result.sort(
    (a, b) => b.repetitionsAmount - a.repetitionsAmount,
  );

  return shortenResult(sortedResult, FREQUENCY_DATUM_AMOUNT);
};

export default useWordsFrequency;
