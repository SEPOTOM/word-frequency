import { TooltipProps } from 'recharts';

export type CustomTooltipProps = TooltipProps<number, string> & {
  type: 'pie' | 'bar';
};
