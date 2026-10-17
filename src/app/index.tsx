import { router, Stack } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  type ScrollViewInstance,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchCategories, fetchProducts } from '@/api/products';
import { EmptyView } from '@/components/empty-view';
import { ErrorView } from '@/components/error-view';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ProductCard } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/use-responsive';
import { useTheme } from '@/hooks/use-theme';
import { styles } from '@/styles/products-list.styles';
import { Product } from '@/types/product';

export default function ProductsListScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { isSmallDevice, numColumns, contentWidth } = useResponsive();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flatListRef = useRef<FlatList<Product>>(null);
  const categoriesScrollRef = useRef<ScrollViewInstance>(null);

  const orderedCategories = useMemo(() => {
    const allOptions = ['all', ...categories.filter((c) => c !== 'all')];
    if (selectedCategory === 'all') {
      return allOptions;
    }
    return [
      selectedCategory,
      ...allOptions.filter((c) => c !== selectedCategory),
    ];
  }, [categories, selectedCategory]);

  // Load categories once on mount
  useEffect(() => {
    let isMounted = true;
    fetchCategories().then((cats) => {
      if (isMounted && cats.length > 0) {
        setCategories(cats);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products by category
  const loadProducts = useCallback(
    async (isRefresh = false, category = selectedCategory) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data = await fetchProducts({
          category: category === 'all' ? undefined : category,
          limit: 30,
        });
        setProducts(data);
      } catch (err: any) {
        setError(err?.message || 'Could not load products. Please check your connection.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    loadProducts(false, selectedCategory);
  }, [loadProducts, selectedCategory]);

  const handleRefresh = useCallback(() => {
    loadProducts(true, selectedCategory);
  }, [loadProducts, selectedCategory]);

  const handleSelectCategory = (cat: string) => {
    if (selectedCategory === cat) return;
    setSelectedCategory(cat);
    categoriesScrollRef.current?.scrollTo({ x: 0, animated: true });
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleItemPress = useCallback((item: Product) => {
    router.push({
      pathname: '/details/[id]',
      params: { id: item.id },
    });
  }, []);

  const renderStickyHeader = () => (
    <ThemedView style={[styles.stickyHeader, { maxWidth: contentWidth }]}>
      <View style={styles.titleRow}>
        <ThemedText
          type="title"
          style={[
            styles.screenTitle,
            isSmallDevice && styles.screenTitleSmall,
          ]}>
          Discover Products
        </ThemedText>
      </View>

      {/* Categories Horizontal Scroll - Sticky on top */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          ref={categoriesScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}>
          {orderedCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const displayName = cat === 'all' ? 'All' : cat.replace(/-/g, ' ');

            return (
              <Pressable
                key={cat}
                onPress={() => handleSelectCategory(cat)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  isSelected
                    ? [styles.categoryChipSelected, { backgroundColor: theme.text }]
                    : { backgroundColor: theme.backgroundElement },
                  pressed && styles.pressed,
                ]}>
                <View style={styles.categoryChipInner}>
                
                  <ThemedText
                    type="smallBold"
                    style={[
                      styles.categoryChipText,
                      isSelected
                        ? { color: theme.background, fontWeight: '700' }
                        : { color: theme.textSecondary },
                    ]}>
                    {displayName}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={[
          styles.mainArea,
          {
            paddingTop: Platform.OS === 'web' ? Spacing.three : insets.top,
          },
        ]}>
        {/* Sticky category header */}
        {renderStickyHeader()}

        {loading && products.length === 0 ? (
          <View style={[styles.centerFill, { maxWidth: contentWidth }]}>
            <LoadingIndicator message="Fetching products from API..." />
          </View>
        ) : error && products.length === 0 ? (
          <View style={[styles.centerFill, { maxWidth: contentWidth }]}>
            <ErrorView
              title="Failed to Load Products"
              message={error}
              onRetry={() => loadProducts(false)}
            />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            key={String(numColumns)}
            data={products}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <ProductCard
                  product={item}
                  onPress={() => handleItemPress(item)}
                  isGrid={numColumns > 1}
                />
              </View>
            )}
            ListEmptyComponent={
              <EmptyView
                title="No Products Found"
                message={
                  selectedCategory !== 'all'
                    ? `There are no products in the "${selectedCategory.replace(/-/g, ' ')}" category at this time.`
                    : 'There are no products available at this time.'
                }
                actionText={selectedCategory !== 'all' ? 'View All Categories' : undefined}
                onAction={
                  selectedCategory !== 'all'
                    ? () => {
                        setSelectedCategory('all');
                        categoriesScrollRef.current?.scrollTo({ x: 0, animated: true });
                      }
                    : undefined
                }
              />
            }
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            style={styles.flatList}
            contentContainerStyle={[
              styles.flatListContent,
              {
                maxWidth: contentWidth,
                paddingBottom: insets.bottom + Spacing.six,
              },
            ]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.text}
                colors={[theme.text]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ThemedView>
  );
}
