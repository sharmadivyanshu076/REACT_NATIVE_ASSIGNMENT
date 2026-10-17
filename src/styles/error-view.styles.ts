import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    minHeight: 280,
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
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  iconText: {
    fontSize: 26,
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
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    marginTop: Spacing.one,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  refreshIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
