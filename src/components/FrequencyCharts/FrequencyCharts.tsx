import { FC } from 'react';

import { useWindowSize } from '@uidotdev/usehooks';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { getTailwindConfig } from '@/utils';

import { FrequencyChartsProps } from './types';

const FrequencyCharts: FC<FrequencyChartsProps> = ({ frequencyData }) => {
  const tailwindConfig = getTailwindConfig();

  const windowSize = useWindowSize();
  const windowWidth = windowSize.width ?? 304;

  const isMobile = windowWidth < parseInt(tailwindConfig.theme.screens.md);
  const containerHeight = isMobile ? windowWidth : 400;

  return frequencyData.length > 0 ?
      <ResponsiveContainer
        width="100%"
        height={containerHeight}
        className="mx-auto w-full max-w-3xl px-2"
      >
        {isMobile ?
          <PieChart className="w-full">
            <Tooltip />
            <Pie
              data={frequencyData}
              dataKey="repetitionsAmount"
              nameKey="entity"
              fill={tailwindConfig.theme.colors.main}
              label
            />
          </PieChart>
        : <BarChart data={frequencyData} className="mx-auto">
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
        }
      </ResponsiveContainer>
    : null;
};

export default FrequencyCharts;
