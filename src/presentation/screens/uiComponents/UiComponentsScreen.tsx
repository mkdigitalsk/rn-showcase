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

export const UiComponentsScreen = () => {
  const colors = useAppColors();

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* ===== BUTTONS ===== */}
        <SectionTitle title="Buttons" />
        <ColumnSpacer2 />
        <ContainedButton text="Contained Button" onPress={() => {}} />
        <ColumnSpacer2 />
        <OutlinedButton text="Outlined Button" onPress={() => {}} />
        <ColumnSpacer2 />
        <AppTextButton text="Text Button" onPress={() => {}} />
        <ColumnSpacer2 />
        <AppTextButtonError text="Error Text Button" onPress={() => {}} />

        <ColumnSpacer4 />

        {/* ===== SEGMENTED BUTTON ===== */}
        <SectionTitle title="Segmented Button" />
        <ColumnSpacer2 />
        <AppSegmentedButton
          options={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
          selectedValue={selectedSegment}
          onValueChanged={setSelectedSegment}
        />

        <ColumnSpacer4 />

        {/* ===== TYPOGRAPHY ===== */}
        <SectionTitle title="Typography" />
        <ColumnSpacer2 />
        <TextHeadlineMediumPrimary>Headline Medium</TextHeadlineMediumPrimary>
        <TextTitleLargeNeutral80>Title Large</TextTitleLargeNeutral80>
        <TextBodyLargeNeutral80>Body Large</TextBodyLargeNeutral80>
        <TextBodyMediumNeutral80>Body Medium</TextBodyMediumNeutral80>
        <TextBodySmallNeutral80>Body Small</TextBodySmallNeutral80>
        <TextLabelLargePrimary>Label Large</TextLabelLargePrimary>
        <TextLabelMediumNeutral80>Label Medium</TextLabelMediumNeutral80>

        <ColumnSpacer4 />

        {/* ===== CARDS ===== */}
        <SectionTitle title="Cards" />
        <ColumnSpacer2 />
        <AppCard elevated onPress={() => {}}>
          <TextBodyMediumNeutral80>Elevated Card (clickable)</TextBodyMediumNeutral80>
        </AppCard>
        <ColumnSpacer2 />
        <AppCard elevated={false} onPress={() => {}}>
          <TextBodyMediumNeutral80>Contained Card (clickable)</TextBodyMediumNeutral80>
        </AppCard>

        <ColumnSpacer4 />

        {/* ===== TEXT FIELD ===== */}
        <SectionTitle title="Text Fields" />
        <ColumnSpacer2 />
        <AppTextField
          value={textFieldValue}
          onChangeText={setTextFieldValue}
          label="Label"
          placeholder="Type something..."
        />

        <ColumnSpacer4 />

        {/* ===== CHECKBOX ===== */}
        <SectionTitle title="Checkbox" />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <AppCheckbox checked={checkboxChecked} onPress={() => setCheckboxChecked(!checkboxChecked)} />
          <TextBodyMediumNeutral80>
            {checkboxChecked ? 'Checked' : 'Unchecked'}
          </TextBodyMediumNeutral80>
        </View>

        <ColumnSpacer4 />

        {/* ===== SWITCH ===== */}
        <SectionTitle title="Switch" />
        <ColumnSpacer2 />
        <View style={styles.row}>
          <AppSwitch value={switchChecked} onValueChange={setSwitchChecked} />
          <RowSpacer2 />
          <TextBodyMediumNeutral80>
            {switchChecked ? 'On' : 'Off'}
          </TextBodyMediumNeutral80>
        </View>

        <ColumnSpacer4 />

        {/* ===== RADIO BUTTONS ===== */}
        <SectionTitle title="Radio Buttons" />
        <ColumnSpacer2 />
        {['Option 1', 'Option 2', 'Option 3'].map((label, index) => (
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
        <SectionTitle title="Chips" />
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          {['Filter 1', 'Filter 2', 'Filter 3'].map((label, index) => (
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
          <AppAssistChip label="Assist" onPress={() => {}} icon="help-circle-outline" />
          <RowSpacer2 />
          <AppInputChip label="Input" selected={false} onPress={() => {}} onClose={() => {}} />
          <RowSpacer2 />
          <AppSuggestionChip label="Suggestion" onPress={() => {}} />
        </View>

        <ColumnSpacer4 />

        {/* ===== SLIDER ===== */}
        <SectionTitle title="Slider" />
        <ColumnSpacer2 />
        <AppSlider value={sliderValue} onValueChange={setSliderValue} />
        <TextBodySmallNeutral80>{`Value: ${sliderValue.toFixed(2)}`}</TextBodySmallNeutral80>

        <ColumnSpacer4 />

        {/* ===== DIVIDER ===== */}
        <SectionTitle title="Divider" />
        <ColumnSpacer2 />
        <AppDividerPrimary />

        <ColumnSpacer4 />

        {/* ===== LOADING / PROGRESS ===== */}
        <SectionTitle title="Loading & Progress" />
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
        <SectionTitle title="Badges" />
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
        <SectionTitle title="Snackbar" />
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          <ContainedButton text="Default" onPress={() => setSnackbar({ visible: true, message: 'Default snackbar', type: 'default' })} />
          <RowSpacer2 />
          <ContainedButton text="Success" onPress={() => setSnackbar({ visible: true, message: 'Success!', type: 'success' })} />
        </View>
        <ColumnSpacer2 />
        <View style={styles.chipRow}>
          <ContainedButton text="Error" onPress={() => setSnackbar({ visible: true, message: 'Error occurred', type: 'error' })} />
          <RowSpacer2 />
          <ContainedButton text="Warning" onPress={() => setSnackbar({ visible: true, message: 'Warning!', type: 'warning' })} />
        </View>

        <ColumnSpacer4 />

        {/* ===== BOTTOM SHEET ===== */}
        <SectionTitle title="Bottom Sheet" />
        <ColumnSpacer2 />
        <ContainedButton text="Show Bottom Sheet" onPress={() => setShowBottomSheet(true)} />

        <ColumnSpacer4 />

        {/* ===== DIALOG ===== */}
        <SectionTitle title="Dialog" />
        <ColumnSpacer2 />
        <ContainedButton text="Show Dialog" onPress={() => setShowDialog(true)} />

        {/* Bottom padding for FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <AppFloatingActionButton icon="plus" onPress={() => {}} />

      {/* Overlays */}
      <AppConfirmDialog
        visible={showDialog}
        title="Confirm"
        text="This is a confirm dialog example."
        onConfirm={() => setShowDialog(false)}
        onDismiss={() => setShowDialog(false)}
      />

      <AppBottomSheet
        visible={showBottomSheet}
        onDismiss={() => setShowBottomSheet(false)}
      >
        <TextTitleLargeNeutral80>Bottom Sheet</TextTitleLargeNeutral80>
        <ColumnSpacer2 />
        <TextBodyMediumNeutral80>
          This is a bottom sheet content area.
        </TextBodyMediumNeutral80>
        <ColumnSpacer4 />
        <ContainedButton text="Close" onPress={() => setShowBottomSheet(false)} />
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
