import { CheckboxChangeEvent } from '@/types';

export interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: CheckboxChangeEvent) => void;
}
