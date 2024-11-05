import { ChangeEvent, FC, useState } from 'react';

import { TextFormProps } from './types';

const TextForm: FC<TextFormProps> = ({ maxChars, onSubmit }) => {
  const [text, setText] = useState('');
  const isError = text === '';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxChars));
  };

  const handleClick = () => {
    onSubmit(text);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-3 px-2">
      <div
        id="character-counter"
        role="status"
        aria-live="polite"
        className="text-xl font-bold text-main"
      >
        Characters left: <span className="font-black">{maxChars}</span>
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        aria-describedby="character-counter"
        className="min-h-40 w-full rounded-md bg-main p-2 text-lg text-secondary"
      />
      {isError && (
        <p role="alert" className="text-center font-bold text-error">
          ! The textbox is empty !
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-md border-4 border-main bg-inherit text-3xl font-bold text-main transition-colors hover:bg-main hover:text-secondary active:border-main-dark active:bg-main-dark active:transition-none"
      >
        Translate
      </button>
    </div>
  );
};

export default TextForm;
