import { useState } from 'react';

import { FrequencyTable, TextForm } from '@/components';
import { useWordsFrequency } from '@/hooks';

const App = () => {
  const [text, setText] = useState('');
  const wordsFrequency = useWordsFrequency(text);

  const handleSubmit = (newText: string) => {
    setText(newText);
  };

  return (
    <>
      <TextForm maxChars={2048} onSubmit={handleSubmit} />
      <FrequencyTable frequencyData={wordsFrequency} />
    </>
  );
};

export default App;
