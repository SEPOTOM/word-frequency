import { useState } from 'react';

import { FrequencyTable, TextForm } from '@/components';

const App = () => {
  const [_text, setText] = useState('');

  const handleSubmit = (newText: string) => {
    setText(newText);
  };

  return (
    <>
      <TextForm maxChars={2048} onSubmit={handleSubmit} />
      <FrequencyTable frequencyData={[]} />
    </>
  );
};

export default App;
