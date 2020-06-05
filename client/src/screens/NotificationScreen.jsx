import { View } from 'react-native'
import React from 'react'
import Text from '../components/Text'

function NotificationScreen({ navigation }) {
  return (
    <View>
      <Text
        style={{
          marginTop: 300,
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 40
        }}
      >
        Notifications
      </Text>
    </View>
  )
}

export default NotificationScreen
