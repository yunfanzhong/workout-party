import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AccountIcon from './assets/images/account_circle-24px.svg'
import ChevronLeft from './assets/images/chevron_left-24px.svg'
import NotificationIcon from './assets/images/notifications-24px.svg'
import AccountScreen from './src/screens/AccountScreen.jsx'
import HomeScreen from './src/screens/HomeScreen.jsx'
import LogInScreen from './src/screens/LogInScreen.jsx'
import NotificationScreen from './src/screens/NotificationScreen.jsx'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
          name="Login"
          component={LogInScreen}
          options={{
            headerShown: false
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
