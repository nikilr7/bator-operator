import downtimeData from './downtime.json';

export interface DowntimeCategory {
  tag: string;
  text: string;
  color: string;
  items: string[];
}

export const initialCategories: DowntimeCategory[] = downtimeData;