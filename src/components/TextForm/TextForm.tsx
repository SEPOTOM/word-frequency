import { ChangeEvent, FC, useState } from 'react';

import { TextFormProps } from './types';

const TextForm: FC<TextFormProps> = ({ maxChars }) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxChars));
  };

  return (
    <>
      <textarea value={text} onChange={handleChange} />
      <button type="button">Translate</button>
    </>
  );
};

export default TextForm;
