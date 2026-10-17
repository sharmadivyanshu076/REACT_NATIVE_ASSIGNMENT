import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  pressable: {
    borderRadius: Spacing.four,
    flex: 1,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHorizontal: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
  },
  cardVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: Spacing.two,
  },
  imageContainerHorizontal: {
    width: 104,
    height: 104,
    borderRadius: Spacing.three,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  imageContainerSmall: {
    width: 88,
    height: 88,
  },
  imageContainerVertical: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: Spacing.three,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  discountBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  detailsContainer: {
    flex: 1,
    gap: Spacing.one,
    minWidth: 0,
  },
  topMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  brandText: {
    fontSize: 11,
    flexShrink: 1,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
  ratingRow: {
    marginVertical: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: Spacing.half,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  stockInStock: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  stockLow: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  stockOutOfStock: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  stockText: {
    fontSize: 11,
    fontWeight: '600',
  },
  stockTextIn: {
    color: '#059669',
  },
  stockTextLow: {
    color: '#D97706',
  },
  stockTextOut: {
    color: '#DC2626',
  },
});
