import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainArea: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  stickyHeader: {
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    gap: Spacing.two,
    zIndex: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(156, 163, 175, 0.25)',
    alignSelf: 'center',
  },
  titleRow: {
    gap: Spacing.half,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  screenTitleSmall: {
    fontSize: 22,
  },
  screenSubtitle: {
    fontSize: 14,
  },
  categoriesWrapper: {
    marginHorizontal: -Spacing.three,
    marginTop: Spacing.one,
  },
  categoriesScroll: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two - 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 36,
  },
  categoryChipSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  categoryCheckIcon: {
    fontSize: 12,
    fontWeight: '800',
  },
  categoryChipText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  metaSummaryRow: {
    paddingTop: Spacing.half,
  },
  flatList: {
    width: '100%',
    flex: 1,
  },
  centerFill: {
    width: '100%',
    paddingHorizontal: Spacing.three,
    flex: 1,
    alignSelf: 'center',
  },
  flatListContent: {
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    flexGrow: 1,
    alignSelf: 'center',
  },
  cardWrapper: {
    flex: 1,
  },
  columnWrapper: {
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  itemSeparator: {
    height: Spacing.three,
  },
  pressed: {
    opacity: 0.75,
  },
});
