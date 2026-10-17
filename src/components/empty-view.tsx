import React from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { styles } from '@/styles/empty-view.styles';

interface EmptyViewProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyView({
  title = 'No items found',
  message = 'Try searching with different keywords or choosing another category.',
  actionText,
  onAction,
}: EmptyViewProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.iconCircle}>
          <ThemedText style={styles.iconText}>🔍</ThemedText>
        </View>

        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>

        <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
          {message}
        </ThemedText>

        {actionText && onAction ? (
          <Pressable
            onPress={onAction}
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: theme.backgroundSelected },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={[styles.actionButtonText, { color: theme.text }]}>
              {actionText}
            </ThemedText>
          </Pressable>
        ) : null}
      </ThemedView>
    </View>
  );
}
