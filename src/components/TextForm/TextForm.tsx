import { ChangeEvent, FC, useState } from 'react';

import { TextFormProps } from './types';

const TextForm: FC<TextFormProps> = ({ maxChars, onSubmit }) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxChars));
  };

  const handleClick = () => {
    onSubmit(text);
  };

  return (
    <>
      <textarea value={text} onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        Translate
      </button>
    </>
  );
};

export default TextForm;
