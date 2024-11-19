import { ParsingOptions } from '@/types';

export interface ParsingOptionsPanelProps {
  options: ParsingOptions;
  onOptionsChange: (newOptions: ParsingOptions) => void;
}
