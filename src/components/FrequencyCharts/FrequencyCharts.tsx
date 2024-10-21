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

import { FrequencyChartsProps } from './types';

const FrequencyCharts: FC<FrequencyChartsProps> = ({ frequencyData }) => (
  <BarChart width={1400} height={400} data={frequencyData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="entity" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="repetitionsAmount" fill="#8884d8" />
  </BarChart>
);

export default FrequencyCharts;
