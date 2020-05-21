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
import RedButton from '../components/RedButton.jsx'
import AddCircleIcon from '../../assets/images/add_circle_outline-24px.svg'

function PartyListScreen({ navigation }) {
  const navToPartyInfoScreen = () => {
    navigation.navigate('Party Info')
  }

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
          My Parties
        </Text>

        <RedButton text="Party 1" onPress={navToPartyInfoScreen} />
        <RedButton text="Party 2" onPress={navToPartyInfoScreen} />
        <AddCircleIcon width={40} height={40} fill="black" />
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

export default PartyListScreen
