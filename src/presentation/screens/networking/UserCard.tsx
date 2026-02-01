import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { User } from '../../../domain/models/User';
import { space2, space4 } from '../../foundation/dimensions';
import { AppCard } from '../../components';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <AppCard>
      <Text variant="titleMedium">{user.name}</Text>
      <Text variant="bodyMedium" style={styles.email}>
        {user.email}
      </Text>
      <Text variant="bodySmall" style={styles.address}>
        {user.address.street}, {user.address.city}
      </Text>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: space4,
  },
  email: {
    marginTop: space2,
    opacity: 0.7,
  },
  address: {
    marginTop: space2,
    opacity: 0.5,
  },
});
