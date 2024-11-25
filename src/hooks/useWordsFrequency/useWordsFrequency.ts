import { FrequencyDatum, ParsingOptions } from '@/types';
import { isLetter } from '@/utils';

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

  return result.sort((a, b) => b.repetitionsAmount - a.repetitionsAmount);
};

export default useWordsFrequency;
