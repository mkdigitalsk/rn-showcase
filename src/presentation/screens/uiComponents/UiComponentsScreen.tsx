import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  TextHeadlineMediumPrimary,
  TextTitleLargeNeutral80,
  TextBodyLargeNeutral80,
  TextBodyMediumNeutral80,
  TextBodySmallNeutral80,
  TextLabelLargePrimary,
  TextLabelMediumNeutral80,
  ContainedButton,
  OutlinedButton,
  AppTextButton,
  AppTextButtonError,
  AppFloatingActionButton,
  AppSegmentedButton,
  AppCard,
  AppTextField,
  AppCheckbox,
  AppSwitch,
  AppRadioButton,
  AppFilterChip,
  AppAssistChip,
  AppInputChip,
  AppSuggestionChip,
  AppSlider,
  AppDividerPrimary,
  CircularProgress,
  AppLinearProgress,
  AppBadge,
  AppBadgedBox,
  AppDotBadgedBox,
  AppBottomSheet,
  AppConfirmDialog,
  AppSnackbar,
  ColumnSpacer2,
  ColumnSpacer4,
  RowSpacer2,
  RowSpacer4,
} from '../../components';
import { space4, space2 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';

export const UiComponentsScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();

  // Local state for interactive components
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState('day');
  const [selectedChips, setSelectedChips] = useState<Set<number>>(new Set());
  const [sliderValue, setSliderValue] = useState(0.5);
  const [showDialog, setShowDialog] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [snackbar, setSnackbar] = useState<{ visible: boolean; message: string; type: 'default' | 'success' | 'error' | 'warning' }>({
    visible: false,
    message: '',
    type: 'default',
  });

  const toggleChip = (index: number) => {
    setSelectedChips(prev => {
      const next = new Set(prev);
      if (next.has(index)) { next.delete(index); } else { next.add(index); }
      return next;
    });
  };

  const radioLabels = [t('ui_option_1'), t('ui_option_2'), t('ui_option_3')];
  const filterLabels = [t('ui_filter_1'), t('ui_filter_2'), t('ui_filter_3')];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* ===== BUTTONS ===== */}
        <SectionTitle title={t('ui_section_buttons')} />
        <ColumnSpacer2 />
        <ContainedButton text={t('ui_contained_button')} onPress={() => {}} />
        <ColumnSpacer2 />
        <OutlinedButton text={t('ui_outlined_button')} onPress={() => {}} />
        <ColumnSpacer2 />
        <AppTextButton text={t('ui_text_button')} onPress={() => {}} />
        <ColumnSpacer2 />
        <AppTextButtonError text={t('ui_error_text_button')} onPress={() => {}} />

        <ColumnSpacer4 />

        {/* ===== SEGMENTED BUTTON ===== */}
        <SectionTitle title={t('ui_section_segmented')} />
        <ColumnSpacer2 />
        <AppSegmentedButton
          options={[
            { value: 'day', label: t('ui_segment_day') },
            { value: 'week', label: t('ui_segment_week') },
            { value: 'month', label: t('ui_segment_month') },
          ]}
          selectedValue={selectedSegment}
          onValueChanged={setSelectedSegment}
        />

        <ColumnSpacer4 />

        {/* ===== TYPOGRAPHY ===== */}
        <SectionTitle title={t('ui_section_typography')} />
        <ColumnSpacer2 />
        <TextHeadlineMediumPrimary>{t('ui_headline_medium')}</TextHeadlineMediumPrimary>
        <TextTitleLargeNeutral80>{t('ui_title_large')}</TextTitleLargeNeutral80>
        <TextBodyLargeNeutral80>{t('ui_body_large')}</TextBodyLargeNeutral80>
        <TextBodyMediumNeutral80>{t('ui_body_medium')}</TextBodyMediumNeutral80>
        <TextBodySmallNeutral80>{t('ui_body_small')}</TextBodySmallNeutral80>
        <TextLabelLargePrimary>{t('ui_label_large')}</TextLabelLargePrimary>
        <TextLabelMediumNeutral80>{t('ui_label_medium')}</TextLabelMediumNeutral80>

        <ColumnSpacer4 />

        {/* ===== CARDS ===== */}
        <SectionTitle title={t('ui_section_cards')} />
        <ColumnSpacer2 />
        <AppCard elevated onPress={() => {}}>
          <TextBodyMediumNeutral80>{t('ui_elevated_card')}</TextBodyMediumNeutral80>
        </AppCard>
        <ColumnSpacer2 />
        <AppCard elevated={false} onPress={() => {}}>
          <TextBodyMediumNeutral80>{t('ui_contained_card')}</TextBodyMediumNeutral80>
        </AppCard>

        <ColumnSpacer4 />

        {/* ===== TEXT FIELD ===== */}
        <SectionTitle title={t('ui_section_text_fields')} />
        <ColumnSpacer2 />
        <AppTextField
          value={textFieldValue}
          onChangeText={setTextFieldValue}
          label={t('ui_text_field_label')}
          placeholder={t('ui_text_field_placeholder')}
        />

        <ColumnSpacer4 />

        {/* ===== CHECKBOX ===== */}
        <SectionTitle title={t('ui_section_checkbox')} />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <AppCheckbox checked={checkboxChecked} onPress={() => setCheckboxChecked(!checkboxChecked)} />
          <TextBodyMediumNeutral80>
            {checkboxChecked ? t('ui_checked') : t('ui_unchecked')}
          </TextBodyMediumNeutral80>
        </View>

        <ColumnSpacer4 />

        {/* ===== SWITCH ===== */}
        <SectionTitle title={t('ui_section_switch')} />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <AppSwitch value={switchChecked} onValueChange={setSwitchChecked} />
          <RowSpacer2 />
          <TextBodyMediumNeutral80>
            {switchChecked ? t('ui_on') : t('ui_off')}
          </TextBodyMediumNeutral80>
        </View>

        <ColumnSpacer4 />

        {/* ===== RADIO BUTTONS ===== */}
        <SectionTitle title={t('ui_section_radio')} />
        <ColumnSpacer2 />
        {radioLabels.map((label, index) => (
          <View key={label} style={styles.row}>
            <AppRadioButton
              selected={selectedRadio === index}
              onPress={() => setSelectedRadio(index)}
            />
            <TextBodyMediumNeutral80>{label}</TextBodyMediumNeutral80>
          </View>
        ))}

        <ColumnSpacer4 />

        {/* ===== CHIPS ===== */}
        <SectionTitle title={t('ui_section_chips')} />
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          {filterLabels.map((label, index) => (
            <React.Fragment key={label}>
              <AppFilterChip
                label={label}
                selected={selectedChips.has(index)}
                onPress={() => toggleChip(index)}
              />
              <RowSpacer2 />
            </React.Fragment>
          ))}
        </View>
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          <AppAssistChip label={t('ui_chip_assist')} onPress={() => {}} icon="help-circle-outline" />
          <RowSpacer2 />
          <AppInputChip label={t('ui_chip_input')} selected={false} onPress={() => {}} onClose={() => {}} />
          <RowSpacer2 />
          <AppSuggestionChip label={t('ui_chip_suggestion')} onPress={() => {}} />
        </View>

        <ColumnSpacer4 />

        {/* ===== SLIDER ===== */}
        <SectionTitle title={t('ui_section_slider')} />
        <ColumnSpacer2 />
        <AppSlider value={sliderValue} onValueChange={setSliderValue} />
        <TextBodySmallNeutral80>{`Value: ${sliderValue.toFixed(2)}`}</TextBodySmallNeutral80>

        <ColumnSpacer4 />

        {/* ===== DIVIDER ===== */}
        <SectionTitle title={t('ui_section_divider')} />
        <ColumnSpacer2 />
        <AppDividerPrimary />

        <ColumnSpacer4 />

        {/* ===== LOADING / PROGRESS ===== */}
        <SectionTitle title={t('ui_section_loading')} />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <CircularProgress size="small" />
          <RowSpacer4 />
          <CircularProgress size="large" />
        </View>
        <ColumnSpacer2 />
        <AppLinearProgress progress={0.6} />
        <ColumnSpacer2 />
        <AppLinearProgress indeterminate />

        <ColumnSpacer4 />

        {/* ===== BADGES ===== */}
        <SectionTitle title={t('ui_section_badges')} />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <AppBadge count={5} />
          <RowSpacer4 />
          <AppBadgedBox count={12} icon="bell-outline" />
          <RowSpacer4 />
          <AppDotBadgedBox showBadge icon="email-outline" />
        </View>

        <ColumnSpacer4 />

        {/* ===== SNACKBAR ===== */}
        <SectionTitle title={t('ui_section_snackbar')} />
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          <ContainedButton text={t('ui_snackbar_default')} onPress={() => setSnackbar({ visible: true, message: t('ui_snackbar_default_message'), type: 'default' })} />
          <RowSpacer2 />
          <ContainedButton text={t('ui_snackbar_success')} onPress={() => setSnackbar({ visible: true, message: t('ui_snackbar_success_message'), type: 'success' })} />
        </View>
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          <ContainedButton text={t('ui_snackbar_error')} onPress={() => setSnackbar({ visible: true, message: t('ui_snackbar_error_message'), type: 'error' })} />
          <RowSpacer2 />
          <ContainedButton text={t('ui_snackbar_warning')} onPress={() => setSnackbar({ visible: true, message: t('ui_snackbar_warning_message'), type: 'warning' })} />
        </View>

        <ColumnSpacer4 />

        {/* ===== BOTTOM SHEET ===== */}
        <SectionTitle title={t('ui_section_bottom_sheet')} />
        <ColumnSpacer2 />
        <ContainedButton text={t('ui_show_bottom_sheet')} onPress={() => setShowBottomSheet(true)} />

        <ColumnSpacer4 />

        {/* ===== DIALOG ===== */}
        <SectionTitle title={t('ui_section_dialog')} />
        <ColumnSpacer2 />
        <ContainedButton text={t('ui_show_dialog')} onPress={() => setShowDialog(true)} />

        {/* Bottom padding for FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <AppFloatingActionButton icon="plus" onPress={() => {}} />

      {/* Overlays */}
      <AppConfirmDialog
        visible={showDialog}
        title={t('ui_dialog_title')}
        text={t('ui_dialog_text')}
        onConfirm={() => setShowDialog(false)}
        onDismiss={() => setShowDialog(false)}
      />

      <AppBottomSheet
        visible={showBottomSheet}
        onDismiss={() => setShowBottomSheet(false)}
      >
        <TextTitleLargeNeutral80>{t('ui_bottom_sheet_title')}</TextTitleLargeNeutral80>
        <ColumnSpacer2 />
        <TextBodyMediumNeutral80>
          {t('ui_bottom_sheet_content')}
        </TextBodyMediumNeutral80>
        <ColumnSpacer4 />
        <ContainedButton text={t('ui_close')} onPress={() => setShowBottomSheet(false)} />
      </AppBottomSheet>

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
      />
    </View>
  );
};

// Section title component
const SectionTitle = ({ title }: { title: string }) => (
  <TextTitleLargeNeutral80>{title}</TextTitleLargeNeutral80>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: space4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
