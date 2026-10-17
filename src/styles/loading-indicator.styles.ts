import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    minHeight: 220,
  },
  spinner: {
    marginBottom: Spacing.two,
  },
  message: {
    textAlign: 'center',
  },
});
