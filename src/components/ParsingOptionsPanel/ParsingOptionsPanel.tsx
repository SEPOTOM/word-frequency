import { FC } from 'react';

import { Checkbox } from '@/components';
import { CheckboxChangeEvent, ParsingOptions } from '@/types';

import { ParsingOptionsPanelProps } from './types';

const ParsingOptionsPanel: FC<ParsingOptionsPanelProps> = ({
  options,
  onOptionsChange,
}) => {
  const onChange = (e: CheckboxChangeEvent) => {
    const optionName = e.target.name as keyof ParsingOptions;

    onOptionsChange({
      ...options,
      [optionName]: e.target.checked,
    });
  };

  return (
    <ul className="mx-auto flex w-full max-w-3xl flex-col gap-y-3 px-2 text-lg font-bold text-main">
      {Object.keys(options).map((optionKey) => (
        <li
          key={optionKey}
          className="last:border-b-2 last:border-main last:pb-2"
        >
          <label className="flex items-center justify-between gap-x-3">
            {optionKey}
            <Checkbox
              name={optionKey}
              checked={options[optionKey as keyof ParsingOptions]}
              onChange={onChange}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ParsingOptionsPanel;
