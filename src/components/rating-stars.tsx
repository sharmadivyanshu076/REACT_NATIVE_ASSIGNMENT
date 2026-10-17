import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/styles/rating-stars.styles';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

export function RatingStars({ rating, count, size = 14, showCount = true }: RatingStarsProps) {
  const rounded = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(rounded);
  const hasHalf = rounded - fullStars >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <ThemedText key={`f-${i}`} style={[styles.starFilled, { fontSize: size }]}>
            ★
          </ThemedText>
        ))}
        {hasHalf ? (
          <ThemedText style={[styles.starHalf, { fontSize: size }]}>
            ★
          </ThemedText>
        ) : null}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <ThemedText key={`e-${i}`} style={[styles.starEmpty, { fontSize: size }]}>
            ☆
          </ThemedText>
        ))}
      </View>
      <ThemedText type="smallBold" style={styles.scoreText}>
        {rounded.toFixed(1)}
      </ThemedText>
      {showCount && typeof count === 'number' ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.countText}>
          ({count})
        </ThemedText>
      ) : null}
    </View>
  );
}
