import type { ChangeEvent } from 'react';

export interface SearchBarProps {
  query: string;
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
