import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  innerContainer: {
    width: '100%',
    gap: Spacing.three,
  },
  innerContainerTablet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.four,
  },
  tabletLeftCol: {
    flex: 1,
    gap: Spacing.three,
    position: 'relative',
  },
  tabletRightCol: {
    flex: 1.2,
    gap: Spacing.three,
  },
  imageGalleryContainer: {
    gap: Spacing.two,
    width: '100%',
  },
  heroImageCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: Spacing.four,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroImage: {
    width: '90%',
    height: '90%',
  },
  discountFloatingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  discountFloatingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  thumbnailList: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  thumbnailButton: {
    width: 60,
    height: 60,
    minWidth: 44,
    minHeight: 44,
    borderRadius: Spacing.two,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '85%',
    height: '85%',
  },
  sectionCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  categoryBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  brand: {
    fontSize: 13,
  },
  productTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  productTitleSmall: {
    fontSize: 19,
    lineHeight: 24,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginVertical: Spacing.half,
  },
  skuText: {
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(156, 163, 175, 0.25)',
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: '800',
  },
  strikethroughPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  stockStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  stockStatusIn: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  stockStatusLow: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  stockStatusOut: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  stockStatusText: {
    fontSize: 12,
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
  sectionHeading: {
    fontSize: 17,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  specItem: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: Spacing.two,
    backgroundColor: 'rgba(156, 163, 175, 0.08)',
    borderRadius: Spacing.two,
    gap: 2,
    minWidth: 130,
  },
  specItemTablet: {
    flexBasis: '30%',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  reviewsList: {
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  reviewItem: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(156, 163, 175, 0.2)',
    paddingTop: Spacing.two,
    gap: 4,
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  reviewerName: {
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 11,
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(156, 163, 175, 0.25)',
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomBarInner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bottomBarPrice: {
    gap: 2,
    flexShrink: 1,
  },
  bottomBarPriceValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  ctaButton: {
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 46,
    minWidth: 140,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
