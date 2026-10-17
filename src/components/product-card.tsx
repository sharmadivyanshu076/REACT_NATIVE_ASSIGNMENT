import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';

import { formatPrice } from '@/api/products';
import { RatingStars } from '@/components/rating-stars';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useResponsive } from '@/hooks/use-responsive';
import { styles } from '@/styles/product-card.styles';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isGrid?: boolean;
}

export const ProductCard = React.memo(function ProductCard({
  product,
  onPress,
  isGrid = false,
}: ProductCardProps) {
  const { isSmallDevice } = useResponsive();

  const originalPrice =
    product.discountPercentage && product.discountPercentage > 0
      ? product.price / (1 - product.discountPercentage / 100)
      : null;

  const isLowStock = product.stock <= 10;
  const isOutOfStock = product.stock <= 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      <ThemedView
        type="backgroundElement"
        style={[
          styles.card,
          isGrid ? styles.cardVertical : styles.cardHorizontal,
        ]}>
        <View
          style={[
            isGrid
              ? styles.imageContainerVertical
              : [
                  styles.imageContainerHorizontal,
                  isSmallDevice && styles.imageContainerSmall,
                ],
          ]}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            contentFit="contain"
            transition={200}
            cachePolicy="memory-disk"
          />
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <View style={styles.discountBadge}>
              <ThemedText style={styles.discountBadgeText}>
                -{Math.round(product.discountPercentage)}%
              </ThemedText>
            </View>
          ) : null}
        </View>

        <View style={styles.detailsContainer}>
          <ThemedText
            type="default"
            numberOfLines={isGrid ? 1 : 2}
            style={styles.title}>
            {product.title}
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textSecondary"
            numberOfLines={isGrid ? 2 : 2}
            style={styles.description}>
            {product.description}
          </ThemedText>

          <View style={styles.ratingRow}>
            <RatingStars
              rating={product.rating}
              count={product.reviews ? product.reviews.length : undefined}
            />
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.priceContainer}>
              <ThemedText type="subtitle" style={styles.price}>
                {formatPrice(product.price)}
              </ThemedText>
              {originalPrice ? (
                <ThemedText type="small" themeColor="textSecondary" style={styles.originalPrice}>
                  {formatPrice(originalPrice)}
                </ThemedText>
              ) : null}
            </View>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
});
