import { DateRange, SelectionState } from '../../../domain/model/Calendar';

export interface CalendarUiState {
  today: string | null;
  selectionState: SelectionState;
  selectedRange: DateRange;
  disabledDates: Set<string>;
}

export const initialCalendarUiState: CalendarUiState = {
  today: null,
  selectionState: SelectionState.EMPTY,
  selectedRange: { startDate: null, endDate: null },
  disabledDates: new Set(),
};
