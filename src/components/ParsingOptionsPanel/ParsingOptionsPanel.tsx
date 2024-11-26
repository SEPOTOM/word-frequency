import { FC } from 'react';

import { Checkbox } from '@/components';
import { OPTIONS_NAMES } from '@/components/ParsingOptionsPanel/consts';
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-3 px-2">
      <h3 className="bg-main py-1 text-center text-2xl font-bold text-secondary">
        Options
      </h3>
      <ul className="flex flex-col gap-y-3 text-lg font-bold text-main">
        {Object.keys(options).map((optionKey) => (
          <li
            key={optionKey}
            className="last:border-b-2 last:border-main last:pb-2"
          >
            <label className="flex items-center justify-between gap-x-3">
              {OPTIONS_NAMES[optionKey as keyof ParsingOptions]}
              <Checkbox
                name={optionKey}
                checked={options[optionKey as keyof ParsingOptions]}
                onChange={onChange}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParsingOptionsPanel;
