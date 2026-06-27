import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { User } from '../../../domain/model/User';
import { space2 } from '../../foundation/dimensions';
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
    </AppCard>
  );
};

const styles = StyleSheet.create({
  email: {
    marginTop: space2,
    opacity: 0.7,
  },
});
