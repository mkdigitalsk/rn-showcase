import React from 'react';
import { Text } from 'react-native-paper';
import { User } from '../../../domain/model/User';
import { AppCard } from '../../components';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <AppCard>
      <Text variant="titleMedium">{user.email}</Text>
    </AppCard>
  );
};
