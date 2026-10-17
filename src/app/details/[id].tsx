import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchProductById, formatPrice } from '@/api/products';
import { ErrorView } from '@/components/error-view';
import { LoadingIndicator } from '@/components/loading-indicator';
import { RatingStars } from '@/components/rating-stars';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/use-responsive';
import { useTheme } from '@/hooks/use-theme';
import { styles } from '@/styles/product-detail.styles';
import { Product } from '@/types/product';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { isSmallDevice, isTablet, width, contentWidth } = useResponsive();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const loadProduct = useCallback(
    async (isRefresh = false) => {
      if (!id) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data = await fetchProductById(id);
        setProduct(data);
        console.log('Fetched product details:', data);
        setSelectedImageIndex(0);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    if (Platform.OS === 'web') {
      setTimeout(() => setAddedToCart(false), 2500);
    } else {
      Alert.alert('Added to Cart', `"${product?.title}" has been added to your bag.`, [
        { text: 'Continue Shopping', style: 'cancel' },
      ]);
      setTimeout(() => setAddedToCart(false), 2500);
    }
  };

  const images = product?.images && product.images.length > 0 ? product.images : (product ? [product.thumbnail] : []);
  const activeImage = images[selectedImageIndex] || product?.thumbnail;

  const originalPrice =
    product?.discountPercentage && product.discountPercentage > 0
      ? product.price / (1 - product.discountPercentage / 100)
      : null;

  const isLowStock = product ? product.stock <= 10 : false;
  const isOutOfStock = product ? product.stock <= 0 : false;

  // Responsive hero image height
  const heroImageHeight = isTablet
    ? 380
    : isSmallDevice
    ? Math.min(width - 32, 240)
    : Math.min(width - 32, 320);

  const bottomInset = Math.max(insets.bottom, Spacing.three);
  const bottomBarPadding = 80 + bottomInset;

  const renderGallery = () => (
    <View style={styles.imageGalleryContainer}>
      <View style={[styles.heroImageCard, { height: heroImageHeight }]}>
        {activeImage ? (
          <Image
            source={{ uri: activeImage }}
            style={styles.heroImage}
            contentFit="contain"
            transition={250}
            cachePolicy="memory-disk"
          />
        ) : null}

        {product?.discountPercentage && product.discountPercentage > 0 ? (
          <View style={styles.discountFloatingBadge}>
            <ThemedText style={styles.discountFloatingText}>
              {Math.round(product.discountPercentage)}% OFF
            </ThemedText>
          </View>
        ) : null}
      </View>

      {/* Thumbnails row if multiple images exist */}
      {images.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}>
          {images.map((imgUri, idx) => {
            const isSelected = idx === selectedImageIndex;
            return (
              <Pressable
                key={`thumb-${idx}`}
                onPress={() => setSelectedImageIndex(idx)}
                style={[
                  styles.thumbnailButton,
                  isSelected && {
                    borderColor: theme.text,
                    borderWidth: 2,
                  },
                ]}>
                <Image
                  source={{ uri: imgUri }}
                  style={styles.thumbnailImage}
                  contentFit="contain"
                />
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );

  const renderProductInfo = () => (
    <>
      {/* Main Info Card */}
      <ThemedView type="backgroundElement" style={styles.sectionCard}>
        <View style={styles.metaRow}>
          {product?.brand ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.brand}>
              Brand: <ThemedText type="smallBold">{product.brand}</ThemedText>
            </ThemedText>
          ) : null}
        </View>

        <ThemedText
          type="title"
          style={[
            styles.productTitle,
            isSmallDevice && styles.productTitleSmall,
          ]}>
          {product?.title}
        </ThemedText>

        <View style={styles.ratingSection}>
          <RatingStars
            rating={product?.rating ?? 0}
            count={product?.reviews?.length}
            size={16}
          />
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceGroup}>
            <ThemedText style={styles.currentPrice}>
              {formatPrice(product?.price ?? 0)}
            </ThemedText>
            {originalPrice ? (
              <ThemedText
                type="default"
                themeColor="textSecondary"
                style={styles.strikethroughPrice}>
                {formatPrice(originalPrice)}
              </ThemedText>
            ) : null}
          </View>

        </View>
      </ThemedView>

      {/* Description */}
      <ThemedView type="backgroundElement" style={styles.sectionCard}>
        <ThemedText type="subtitle" style={styles.sectionHeading}>
          Description
        </ThemedText>
        <ThemedText style={styles.descriptionText} themeColor="textSecondary">
          {product?.description}
        </ThemedText>
      </ThemedView>

      {/* Specifications Card */}
      <ThemedView type="backgroundElement" style={styles.sectionCard}>
        <ThemedText type="subtitle" style={styles.sectionHeading}>
          Product Specifications
        </ThemedText>

        <View style={styles.specGrid}>
          {product?.weight ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Weight
              </ThemedText>
              <ThemedText type="smallBold">{product.weight} oz</ThemedText>
            </View>
          ) : null}

          {product?.dimensions ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Dimensions
              </ThemedText>
              <ThemedText type="smallBold">
                {product.dimensions.width} x {product.dimensions.height} x{' '}
                {product.dimensions.depth} cm
              </ThemedText>
            </View>
          ) : null}

          {product?.warrantyInformation ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Warranty
              </ThemedText>
              <ThemedText type="smallBold">
                {product.warrantyInformation}
              </ThemedText>
            </View>
          ) : null}

          {product?.shippingInformation ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Shipping
              </ThemedText>
              <ThemedText type="smallBold">
                {product.shippingInformation}
              </ThemedText>
            </View>
          ) : null}

          {product?.returnPolicy ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Return Policy
              </ThemedText>
              <ThemedText type="smallBold">{product.returnPolicy}</ThemedText>
            </View>
          ) : null}

          {product?.minimumOrderQuantity ? (
            <View style={[styles.specItem, isTablet && styles.specItemTablet]}>
              <ThemedText type="small" themeColor="textSecondary">
                Min. Order
              </ThemedText>
              <ThemedText type="smallBold">
                {product.minimumOrderQuantity} pcs
              </ThemedText>
            </View>
          ) : null}
        </View>
      </ThemedView>

     
    </>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.title ? product.title : 'Product Details',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }}
      />

      {loading && !product ? (
        <LoadingIndicator message="Loading product details..." />
      ) : error && !product ? (
        <ErrorView
          title="Could not load product"
          message={error}
          onRetry={() => loadProduct(false)}
        />
      ) : product ? (
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: bottomBarPadding },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadProduct(true)}
                tintColor={theme.text}
                colors={[theme.text]}
              />
            }>
            <View
              style={[
                styles.innerContainer,
                isTablet && styles.innerContainerTablet,
                { maxWidth: contentWidth },
              ]}>
              {isTablet ? (
                <>
                  <View style={styles.tabletLeftCol}>{renderGallery()}</View>
                  <View style={styles.tabletRightCol}>{renderProductInfo()}</View>
                </>
              ) : (
                <>
                  {renderGallery()}
                  {renderProductInfo()}
                </>
              )}
            </View>
          </ScrollView>

          {/* Sticky Bottom Action Bar */}
          <ThemedView
            type="backgroundElement"
            style={[
              styles.bottomBar,
              { paddingBottom: bottomInset },
            ]}>
            <View style={[styles.bottomBarInner, { maxWidth: contentWidth }]}>
              <View style={styles.bottomBarPrice}>
                <ThemedText type="small" themeColor="textSecondary">
                  Total Price
                </ThemedText>
                <ThemedText style={styles.bottomBarPriceValue}>
                  {formatPrice(product.price)}
                </ThemedText>
              </View>

              <Pressable
                onPress={handleAddToCart}
                disabled={isOutOfStock}
                style={({ pressed }) => [
                  styles.ctaButton,
                  { backgroundColor: isOutOfStock ? '#9CA3AF' : theme.text },
                  pressed && styles.pressed,
                ]}>
                <ThemedText
                  style={[
                    styles.ctaButtonText,
                    { color: theme.background },
                  ]}>
                  {isOutOfStock
                    ? 'Out of Stock'
                    : addedToCart
                    ? 'Added to Cart!'
                    : 'Add to Cart'}
                </ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      ) : null}
    </ThemedView>
  );
}
