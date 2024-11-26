import { FC } from 'react';

import { CustomTooltipProps } from './types';

const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  type,
}) => {
  if (active && payload?.length) {
    let name = '';

    switch (type) {
      case 'bar':
        name = String(label);
        break;
      case 'pie':
        name = String(payload[0].name);
        break;
    }

    return (
      <div className="max-w-72 border-2 border-main bg-secondary p-2 text-main-dark">
        <p>
          {`${name} :`} <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
