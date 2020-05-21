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
import ListItem from '../components/ListItem.jsx'
import { useNavigation } from '@react-navigation/native'

function PartyListItem(props) {
  const navigation = useNavigation()

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Party Info', { partyName: props.text })
      }}
    >
      <Text>{props.text}</Text>
    </ListItem>
  )
}

function PartyListScreen({ navigation }) {
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
        <PartyListItem text="108 1/7 Revolution" />
        <PartyListItem text="IOB" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create Party')
          }}
          style={{ width: 50, height: 50 }}
        >
          <AddCircleIcon width={40} height={40} fill="black" />
        </TouchableOpacity>
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
