import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router';
import React from 'react'
import { Button, Text, View } from 'react-native'

function Profile() {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {isSignedIn && <Button title="Sign out" onPress={() => signOut()} />}
        {
          !isSignedIn && <Link href="/(modals)/login">
          <Text>Sign in</Text>
          </Link>
        }
    </View>
  )
}

export default Profile
