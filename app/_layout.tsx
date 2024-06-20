import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string){
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Failed to fetch the auth token', error);
      return null;
    }
  },
  async saveToken(key: string, token: string){
    try {
      await SecureStore.setItemAsync(key, token);
    } catch (error) {
      console.error('Failed to set the auth token', error);
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ms-b': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'ms-r': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'ms-sb': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  

  if (!loaded) {
    return null;
  }

  return(
    <ClerkProvider  publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('(modals)/login');
    }
  }, [isLoaded]);
  return (
    <Stack>
    <Stack.Screen
      name="(modals)/login"
      options={{
        presentation: 'modal',
        title: 'Log in or sign up',
        headerTitleStyle: {
          fontFamily: 'mon-sb',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-outline" size={28} />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="listing/[id]" options={{ headerTitle: '', headerBackTitleVisible: false }} />
    <Stack.Screen
      name="(modals)/booking"
      options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerTransparent: true,
        headerTitle: (props) => <></>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: '#fff',
              borderColor: Colors.grey,
              borderRadius: 20,
              borderWidth: 1,
              padding: 4,
            }}>
            <Ionicons name="close-outline" size={22} />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack>
  );
}
