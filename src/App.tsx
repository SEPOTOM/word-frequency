import { useState } from 'react';

import {
  FrequencyCharts,
  FrequencyTable,
  ParsingOptionsPanel,
  TextForm,
} from '@/components';
import { useWordsFrequency } from '@/hooks';
import { ParsingOptions } from '@/types';

const App = () => {
  const [text, setText] = useState('');
  const [parsingOptions, setParsingOptions] = useState<ParsingOptions>({
    caseSensitive: true,
  });
  const wordsFrequency = useWordsFrequency(text, parsingOptions);

  const handleSubmit = (newText: string) => {
    setText(newText);
  };

  return (
    <div className="flex flex-col gap-12 bg-inherit py-5">
      <ParsingOptionsPanel
        options={parsingOptions}
        onOptionsChange={(newOptions) => setParsingOptions(newOptions)}
      />
      <TextForm maxChars={2048} onSubmit={handleSubmit} />
      <FrequencyTable frequencyData={wordsFrequency} />
      <FrequencyCharts frequencyData={wordsFrequency} />
    </div>
  );
};

export default App;
