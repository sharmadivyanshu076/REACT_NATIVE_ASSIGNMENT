import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { styles } from '@/styles/error-view.styles';

interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorView({
  title = 'Something went wrong',
  message = 'Unable to load data. Please check your internet connection and try again.',
  onRetry,
  retryText = 'Try Again',
}: ErrorViewProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.card}>
        

        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>

        <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
          {message}
        </ThemedText>

        {onRetry ? (
          <Pressable
            onPress={onRetry}
            style={({ pressed }) => [
              styles.retryButton,
              { backgroundColor: theme.text },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={[styles.retryButtonText, { color: theme.background }]}>
              {retryText}
            </ThemedText>
          </Pressable>
        ) : null}
      </ThemedView>
    </View>
  );
}
