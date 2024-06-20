import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

function Index() {
  return (
    <View>
      <Link 
        href={"/(modals)/login"}
      >
        Login
        </Link>
        <Link 
        href={"/(modals)/booking"}
      >
        Bookings
        </Link>
        <Link 
        href={"/listing/123"}
      >
        Listing details
        </Link>
    </View>
  )
}

export default Index
