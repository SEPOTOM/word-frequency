import { FrequencyDatum } from '@/types';

const useWordsFrequency = (text: string): FrequencyDatum[] => {
  const result: FrequencyDatum[] = [];
  const indexes = new Map<string, number>();

  text.split(' ').forEach((word) => {
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
