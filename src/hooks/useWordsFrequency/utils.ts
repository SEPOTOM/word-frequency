import { FrequencyDatum } from '@/types';

import { IgnoreFunc } from './types';

export const calculateFrequency = (
  words: string[] | Set<string>,
  shouldIgnoreWord: Nullable<IgnoreFunc>,
): FrequencyDatum[] => {
  const result: FrequencyDatum[] = [];
  const indexes = new Map<string, number>();

  const shouldIgnore = (word: string) => {
    if (shouldIgnoreWord) {
      return word === '' || shouldIgnoreWord(word);
    }

    return word === '';
  };

  words.forEach((word) => {
    if (shouldIgnore(word)) {
      return;
    }

    if (indexes.has(word)) {
      result[indexes.get(word) ?? -1].repetitionsAmount += 1;
    } else {
      const newLength = result.push({ entity: word, repetitionsAmount: 1 });
      indexes.set(word, newLength - 1);
    }
  });

  return result;
};
