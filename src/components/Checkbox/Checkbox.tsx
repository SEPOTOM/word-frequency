import { FC } from 'react';

import clsx from 'clsx';

import { CheckboxProps } from './types';

const Checkbox: FC<CheckboxProps> = ({ name, checked, onChange, disabled }) => {
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
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="group relative h-7 w-7 rounded-md border-2 border-main p-1 disabled:border-disabled"
    >
      <span className="invisible absolute left-1/2 top-1/2 h-1 w-[132%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-disabled group-disabled:visible" />
      <span className="invisible absolute left-1/2 top-1/2 h-1 w-[132%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-disabled group-disabled:visible" />
      <div
        className={clsx(
          'h-full w-full rounded-sm',
          checked && 'bg-main group-disabled:bg-disabled',
        )}
      />
    </button>
  );
};

export default Checkbox;
