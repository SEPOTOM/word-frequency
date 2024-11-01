import { FC } from 'react';

import clsx from 'clsx';

import { FrequencyTableProps } from './types';

const FrequencyTable: FC<FrequencyTableProps> = ({ frequencyData }) =>
  frequencyData.length > 0 ?
    <div className="mx-auto w-full max-w-3xl bg-inherit px-2">
      <table className="w-full border-b-2 border-main">
        <caption className="bg-main py-2 text-xl text-secondary">
          Frequency Table
        </caption>
        <tbody>
          {frequencyData.map(({ entity, repetitionsAmount }, index) => {
            const isEven = index % 2 === 0;

            return (
              <tr
                key={`${entity}${repetitionsAmount}`}
                className={clsx(
                  'text-lg',
                  isEven ? 'bg-inherit text-main' : 'bg-main text-secondary',
                )}
              >
                <td className="px-2 py-1">{entity}</td>
                <td className="px-2 py-1 font-bold">{repetitionsAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  : null;

export default FrequencyTable;
