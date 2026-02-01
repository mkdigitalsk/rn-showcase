import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppCard } from '../../components/cards/AppCard';
import { TextTitleLarge } from '../../components/text/titleLarge/TextTitleLarge';
import { TextBodyMedium } from '../../components/text/bodyMedium/TextBodyMedium';
import { ColumnSpacer2 } from '../../components/spacers/Spacers';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { Feature } from './Feature';
import { space2, space4 } from '../../foundation/dimensions';

const FEATURE_CARD_ICON_SIZE = 40;

interface FeatureCardProps {
  feature: Feature;
  onClick: () => void;
}

export const FeatureCard = ({ feature, onClick }: FeatureCardProps) => {
  const colors = useAppColors();
  const { t } = useStrings();

  return (
    <AppCard elevated onPress={onClick}>
      <View style={styles.container}>
        <Icon
          name={feature.icon}
          size={FEATURE_CARD_ICON_SIZE}
          color={colors.primary}
        />
        <View style={styles.textContainer}>
          <TextTitleLarge color={colors.neutral80}>{t(feature.titleKey)}</TextTitleLarge>
          <ColumnSpacer2 />
          <TextBodyMedium color={colors.neutral80}>{t(feature.subtitleKey)}</TextBodyMedium>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: space4,
  },
});
