import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

function Page() {
    const { id } = useLocalSearchParams<{id: string}>()
  return (
    <View>
      <Text>
        Listing page!! {id}
      </Text>
    </View>
  )
}

export default Page
