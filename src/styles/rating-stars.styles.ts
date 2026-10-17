import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starFilled: {
    color: '#F59E0B',
    lineHeight: 18,
  },
  starHalf: {
    color: '#FBBF24',
    lineHeight: 18,
  },
  starEmpty: {
    color: '#9CA3AF',
    lineHeight: 18,
  },
  scoreText: {
    fontSize: 13,
    marginLeft: 2,
  },
  countText: {
    fontSize: 12,
  },
});
