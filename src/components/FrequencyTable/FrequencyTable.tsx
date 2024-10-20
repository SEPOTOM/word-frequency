import { FC } from 'react';

import { FrequencyTableProps } from './types';

const FrequencyTable: FC<FrequencyTableProps> = ({ frequencyData }) => (
  <table>
    <caption>Frequency Table</caption>
    <tbody>
      {frequencyData.map(({ entity, repetitionsAmount }) => (
        <tr key={`${entity}${repetitionsAmount}`}>
          <td>{entity}</td>
          <td>{repetitionsAmount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FrequencyTable;
