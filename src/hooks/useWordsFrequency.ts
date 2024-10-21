import { FrequencyDatum } from '@/types';

const useWordsFrequency = (text: string): FrequencyDatum[] => {
  const result: FrequencyDatum[] = [];
  const indexes: Record<string, number> = {};

  text.split(' ').forEach((word) => {
    if (word === '') {
      return;
    }

    if (word in indexes) {
      result[indexes[word]].repetitionsAmount += 1;
    } else {
      const newLength = result.push({ entity: word, repetitionsAmount: 1 });
      indexes[word] = newLength - 1;
    }
  });

  return result.sort((a, b) => b.repetitionsAmount - a.repetitionsAmount);
};

export default useWordsFrequency;
