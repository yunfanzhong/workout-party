import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
} from 'react-native'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'
import React from 'react'

function Event({ navigation }) {
  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          navigation.navigate('Home')
        }
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 300,
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 40
          }}
        >
          Event
        </Text>
      </View>
    </FlingGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Event
