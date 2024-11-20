import { FrequencyDatum, ParsingOptions } from '@/types';

const useWordsFrequency = (
  text: string,
  options?: ParsingOptions,
): FrequencyDatum[] => {
  const result: FrequencyDatum[] = [];
  const indexes = new Map<string, number>();

  let words: string[] | Set<string> = text.split(' ');

  if (!options?.caseSensitive) {
    const lowercasedWords = words.map((word) => word.toLowerCase());
    words = new Set(lowercasedWords);
  }

  words.forEach((word) => {
    if (word === '') {
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
