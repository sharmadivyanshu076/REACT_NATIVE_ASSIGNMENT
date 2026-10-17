import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { styles } from '@/styles/loading-indicator.styles';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingIndicator({ message = 'Loading...', size = 'large' }: LoadingIndicatorProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.text} style={styles.spinner} />
      {message ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
          {message}
        </ThemedText>
      ) : null}
    </View>
  );
}
