import { ChangeEvent, FC, useState } from 'react';

import clsx from 'clsx';

import { TextFormProps } from './types';

const TextForm: FC<TextFormProps> = ({ maxChars, onSubmit }) => {
  const [text, setText] = useState('');
  const isError = text === '';

  const [remainingChars, setRemainingChars] = useState(maxChars);
  const maxCharsTenPercent = maxChars / 10;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textForInput = e.target.value.slice(0, maxChars);

    setText(textForInput);
    setRemainingChars(maxChars - textForInput.length);
  };

  const handleClick = () => {
    onSubmit(text);
  };

  const handleClear = () => {
    setText('');
    onSubmit('');
    setRemainingChars(maxChars);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-3 px-2">
      <div className="flex items-center justify-between gap-5">
        <div
          id="character-counter"
          role="status"
          aria-live="polite"
          className="text-xl font-bold text-main"
        >
          Characters left:{' '}
          <span
            className={clsx(
              'font-black',
              remainingChars < maxCharsTenPercent && 'text-error',
            )}
          >
            {remainingChars}
          </span>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border-2 border-error bg-inherit px-2 text-xl font-bold text-error transition-colors hover:bg-error hover:text-secondary active:border-error-dark active:bg-error-dark active:transition-none"
        >
          Clear
        </button>
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
