export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export enum SelectionState {
  EMPTY = 'EMPTY',
  START_SELECTED = 'START_SELECTED',
  RANGE_SELECTED = 'RANGE_SELECTED',
}
