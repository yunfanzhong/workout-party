import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
} from 'react-native'
import React from 'react'

function WorkoutPartyScreen({ navigation }) {
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
        Workout Parties
      </Text>
    </View>
  )
}

export default WorkoutPartyScreen
