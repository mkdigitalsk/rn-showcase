export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: number;
}

export enum NoteSortOption {
  DATE_DESC = 'DATE_DESC',
  DATE_ASC = 'DATE_ASC',
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
}
