import { FC } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { getTailwindConfig } from '@/utils';

import { FrequencyChartsProps } from './types';

const FrequencyCharts: FC<FrequencyChartsProps> = ({ frequencyData }) => {
  const tailwindConfig = getTailwindConfig();

  return (
    <div className="container px-2">
      <BarChart width={304} height={400} data={frequencyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="entity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="repetitionsAmount"
          name="Repetitions"
          fill={tailwindConfig.theme.colors.main}
        />
      </BarChart>
    </div>
  );
};

export default FrequencyCharts;
