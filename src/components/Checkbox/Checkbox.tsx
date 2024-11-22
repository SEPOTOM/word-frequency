import { FC } from 'react';

import clsx from 'clsx';

import { CheckboxProps } from './types';

const Checkbox: FC<CheckboxProps> = ({ name, checked, onChange }) => {
  const handleToggle = () => {
    const syntheticEvent = {
      target: { name, checked: !checked },
    };

    onChange(syntheticEvent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      name={name}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="h-7 w-7 rounded-md border-2 border-main p-1"
    >
      <div className={clsx('h-full w-full rounded-sm', checked && 'bg-main')} />
    </button>
  );
};

export default Checkbox;
