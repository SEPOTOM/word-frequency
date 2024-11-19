import { ChangeEvent, FC } from 'react';

import { ParsingOptions } from '@/types';

import { ParsingOptionsPanelProps } from './types';

const ParsingOptionsPanel: FC<ParsingOptionsPanelProps> = ({
  options,
  onOptionsChange,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const optionName = e.currentTarget.name as keyof ParsingOptions;

    onOptionsChange({
      ...options,
      [optionName]: !options[optionName],
    });
  };

  return (
    <ul>
      {Object.keys(options).map((optionKey) => (
        <li key={optionKey}>
          <label>
            <input
              type="checkbox"
              name={optionKey}
              checked={options[optionKey as keyof ParsingOptions]}
              onChange={onChange}
            />
            {optionKey}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ParsingOptionsPanel;
