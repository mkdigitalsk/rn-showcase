import React from 'react';
import { View } from 'react-native';
import {
  space,
  space2,
  space3,
  space4,
  space6,
  space8,
  space12,
} from '../../foundation/dimensions';

// Column Spacers (vertical spacing)
export const ColumnSpacer1: React.FC = () => <View style={{ height: space }} />;
export const ColumnSpacer2: React.FC = () => <View style={{ height: space2 }} />;
export const ColumnSpacer3: React.FC = () => <View style={{ height: space3 }} />;
export const ColumnSpacer4: React.FC = () => <View style={{ height: space4 }} />;
export const ColumnSpacer6: React.FC = () => <View style={{ height: space6 }} />;
export const ColumnSpacer8: React.FC = () => <View style={{ height: space8 }} />;
export const ColumnSpacer12: React.FC = () => <View style={{ height: space12 }} />;

// Row Spacers (horizontal spacing)
export const RowSpacer1: React.FC = () => <View style={{ width: space }} />;
export const RowSpacer2: React.FC = () => <View style={{ width: space2 }} />;
export const RowSpacer3: React.FC = () => <View style={{ width: space3 }} />;
export const RowSpacer4: React.FC = () => <View style={{ width: space4 }} />;
export const RowSpacer6: React.FC = () => <View style={{ width: space6 }} />;
export const RowSpacer8: React.FC = () => <View style={{ width: space8 }} />;
export const RowSpacer12: React.FC = () => <View style={{ width: space12 }} />;
