import { useState } from 'react';

import { FrequencyCharts, FrequencyTable, TextForm } from '@/components';
import { useWordsFrequency } from '@/hooks';

const App = () => {
  const [text, setText] = useState('');
  const wordsFrequency = useWordsFrequency(text);

  const handleSubmit = (newText: string) => {
    setText(newText);
  };

  return (
    <div className="flex flex-col gap-12 bg-inherit py-5">
      <TextForm maxChars={2048} onSubmit={handleSubmit} />
      <FrequencyTable frequencyData={wordsFrequency} />
      <FrequencyCharts frequencyData={wordsFrequency} />
    </div>
  );
};

export default App;
