// React + Expo
import React, { useEffect } from 'react'
import { registerRootComponent } from 'expo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { loadAsync } from 'expo-font'

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
import PartyInfoScreen from './screens/PartyInfoScreen.jsx'
import PartyListScreen from './screens/PartyListScreen.jsx'
import PartySettingsScreen from './screens/PartySettingsScreen.jsx'
import FullPageSpinner from './components/FullPageSpinner'

const Stack = createStackNavigator()

function App() {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const fetchData = async () => {
      await loadAsync({
        'source-sans-pro-semibold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
        'source-sans-pro-regular': require('../assets/fonts/SourceSansPro-Regular.ttf')
      })
      setLoading(false)
    }
    fetchData()
  }, [])
  if (loading) {
    return <FullPageSpinner />
  }
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
            fontFamily: 'source-sans-pro-semibold',
            fontSize: 30
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Welcome Back!',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Account')}
                style={{
                  marginLeft: 16
                }}
              >
                <Icon name="account-circle" size={32} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('My Parties')}
                style={{
                  marginRight: 16
                }}
              >
                <Icon name="fitness-center" size={32} color="white" />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          }}
        />
        <Stack.Screen
          name="My Parties"
          component={PartyListScreen}
          options={{
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={({ route }) => ({
            title: route.params.partyName,
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          })}
        />
        <Stack.Screen
          name="Party Info"
          component={PartyInfoScreen}
          options={{
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          }}
        />
        <Stack.Screen
          name="Party Settings"
          component={PartySettingsScreen}
          options={{
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          }}
        />
        <Stack.Screen
          name="Create Party"
          component={CreatePartyScreenWrapper}
          options={{
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          }}
        />
        <Stack.Screen
          name="Create Event"
          component={CreateEventScreen}
          options={({ navigation, route }) => ({
            headerBackImage: () => (
              <Icon name="navigate-before" size={32} color="white" />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default registerRootComponent(App)
