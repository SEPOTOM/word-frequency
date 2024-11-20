import { FrequencyDatum, ParsingOptions } from '@/types';
import { isLetter } from '@/utils';

const useWordsFrequency = (
  text: string,
  options?: ParsingOptions,
): FrequencyDatum[] => {
  const result: FrequencyDatum[] = [];
  const indexes = new Map<string, number>();
  const separator = options?.lettersOnly ? '' : /[\s\p{P}]+/u;

  let words: string[] | Set<string> = text.split(separator);

  if (!options?.caseSensitive) {
    const lowercasedWords = words.map((word) => word.toLowerCase());
    words = new Set(lowercasedWords);
  }

  words.forEach((word) => {
    if (word === '') {
      return;
    }

    if (options?.lettersOnly && !isLetter(word)) {
      return;
    }

    if (indexes.has(word)) {
      result[indexes.get(word) ?? -1].repetitionsAmount += 1;
    } else {
      const newLength = result.push({ entity: word, repetitionsAmount: 1 });
      indexes.set(word, newLength - 1);
    }
  });

  return result.sort((a, b) => b.repetitionsAmount - a.repetitionsAmount);
};

export default useWordsFrequency;
