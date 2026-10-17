import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    minHeight: 260,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.two,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 163, 175, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  iconText: {
    fontSize: 24,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: Spacing.two,
  },
  actionButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    marginTop: Spacing.one,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
