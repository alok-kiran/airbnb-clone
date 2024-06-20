import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: 'ms-sb'
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: 'Wishlists',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: 'Trips',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default Layout
