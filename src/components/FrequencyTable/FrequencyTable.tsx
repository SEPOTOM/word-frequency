import { FC } from 'react';

import { FrequencyTableProps } from './types';

const FrequencyTable: FC<FrequencyTableProps> = ({ frequencyData }) => (
  <table>
    <caption>Frequency Table</caption>
    {frequencyData.map(({ entity, repetitionsAmount }) => (
      <tr key={`${entity}${repetitionsAmount}`}>
        <td>{entity}</td>
        <td>{repetitionsAmount}</td>
      </tr>
    ))}
  </table>
);

export default FrequencyTable;
