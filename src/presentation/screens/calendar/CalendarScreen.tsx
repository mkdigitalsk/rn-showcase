import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useCalendarViewModel } from './useCalendarViewModel';
import { SelectionState } from '../../../domain/model/Calendar';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { AppCard, OutlinedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodyLargeNeutral80 } from '../../components/text/bodyLarge/TextBodyLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';

const buildMarkedDates = (
  startDate: string | null,
  endDate: string | null,
  disabledDates: Set<string>,
  primaryColor: string,
  rangeColor: string,
) => {
  const marked: Record<string, Record<string, unknown>> = {};

  // Disabled dates
  disabledDates.forEach(date => {
    marked[date] = { disabled: true, disableTouchEvent: false };
  });

  if (!startDate) { return marked; }

  if (!endDate) {
    // Single date selected
    marked[startDate] = {
      ...marked[startDate],
      startingDay: true,
      endingDay: true,
      color: primaryColor,
      textColor: '#fff',
    };
    return marked;
  }

  // Range selected — fill all dates between start and end
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const isStart = dateStr === startDate;
    const isEnd = dateStr === endDate;

    marked[dateStr] = {
      ...(marked[dateStr]?.disabled ? { disabled: true } : {}),
      startingDay: isStart,
      endingDay: isEnd,
      color: isStart || isEnd ? primaryColor : rangeColor,
      textColor: isStart || isEnd ? '#fff' : primaryColor,
    };

    current.setDate(current.getDate() + 1);
  }

  return marked;
};

export const CalendarScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const { uiState, onDateClick, clearSelection } = useCalendarViewModel();

  const markedDates = useMemo(
    () => buildMarkedDates(
      uiState.selectedRange.startDate,
      uiState.selectedRange.endDate,
      uiState.disabledDates,
      colors.primary,
      colors.primary + '30',
    ),
    [uiState.selectedRange, uiState.disabledDates, colors.primary],
  );

  const handleDayPress = (day: DateData) => {
    onDateClick(day.dateString);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('calendar_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('calendar_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      <AppCard elevated>
        <Calendar
          markingType="period"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: colors.surface,
            calendarBackground: colors.surface,
            textSectionTitleColor: colors.neutral80,
            dayTextColor: colors.neutral80,
            todayTextColor: colors.primary,
            todayBackgroundColor: 'transparent',
            todayDotColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#fff',
            monthTextColor: colors.neutral80,
            arrowColor: colors.primary,
            disabledArrowColor: colors.neutral40,
            textDisabledColor: colors.neutral40,
          }}
        />
      </AppCard>

      <ColumnSpacer4 />

      {uiState.selectionState === SelectionState.EMPTY ? (
        <TextBodyMediumNeutral80>{t('calendar_no_selection')}</TextBodyMediumNeutral80>
      ) : (
        <AppCard elevated>
          <TextBodyLargeNeutral80>{t('calendar_selected_range')}</TextBodyLargeNeutral80>
          <ColumnSpacer2 />
          {uiState.selectedRange.startDate && (
            <TextBodyMediumNeutral80>
              {`${t('calendar_start_date')}: ${uiState.selectedRange.startDate}`}
            </TextBodyMediumNeutral80>
          )}
          {uiState.selectedRange.endDate && (
            <TextBodyMediumNeutral80>
              {`${t('calendar_end_date')}: ${uiState.selectedRange.endDate}`}
            </TextBodyMediumNeutral80>
          )}
          <ColumnSpacer4 />
          <OutlinedButton text={t('calendar_clear_selection')} onPress={clearSelection} />
        </AppCard>
      )}
    </ScrollView>
  );
};
