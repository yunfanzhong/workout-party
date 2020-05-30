// React + Expo
import React from 'react'
import { registerRootComponent } from 'expo'

// Gesture Handler
import 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Contexts
import UserContext from './context/UserContext'
import UserProvider from './context/UserProvider.jsx'

// Screens
import AccountScreen from './screens/AccountScreen.jsx'
import CreateEventScreen from './screens/CreateEventScreen.jsx'
import CreatePartyScreenWrapper from './screens/CreatePartyScreen.jsx'
import EventScreen from './screens/EventScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LogInScreen from './screens/LogInScreen.jsx'
import NotificationScreen from './screens/NotificationScreen.jsx'
import PartyInfoScreen from './screens/PartyInfoScreen.jsx'
import PartyListScreen from './screens/PartyListScreen.jsx'
import PartySettingsScreen from './screens/PartySettingsScreen.jsx'

// Image assets
import AccountIcon from '../assets/images/account_circle-24px.svg'
import ChevronLeft from '../assets/images/chevron_left-24px.svg'
import NotificationIcon from '../assets/images/notifications-24px.svg'

const Stack = createStackNavigator()

function App() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {(context) =>
          context.user === null ? <UnauthenticatedApp /> : <AuthenticatedApp />
        }
      </UserContext.Consumer>
    </UserProvider>
  )
}

function UnauthenticatedApp() {
  return <LogInScreen />
}

function AuthenticatedApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#ff2559' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Workout Party',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Account')}
                style={{
                  width: 50,
                  marginLeft: 30
                }}
              >
                <AccountIcon width={40} height={40} fill="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
                style={{
                  width: 50,
                  marginRight: 15
                }}
              >
                <NotificationIcon width={40} height={40} fill="white" />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="My Parties"
          component={PartyListScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Party Info"
          component={PartyInfoScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Party Settings"
          component={PartySettingsScreen}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Create Party"
          component={CreatePartyScreenWrapper}
          options={{
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          }}
        />
        <Stack.Screen
          name="Create Event"
          component={CreateEventScreen}
          options={({ navigation, route }) => ({
            headerBackImage: () => (
              <ChevronLeft width={40} height={40} fill="white" />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default registerRootComponent(App)
