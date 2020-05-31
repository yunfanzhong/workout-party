import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
} from 'react-native'
import React from 'react'
import RedButton from '../components/RedButton.jsx'
import AddCircleIcon from '../../assets/images/add_circle-24px.svg'
import ListItem from '../components/ListItem.jsx'
import { useNavigation } from '@react-navigation/native'

function PartyListItem({ text }) {
  const navigation = useNavigation()

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Party Info', { partyName: text })
      }}
    >
      <Text>{text}</Text>
    </ListItem>
  )
}

function PartyList({ partyList }) {
  const list = partyList.map((party) => (
    <ListItem key={party.id} partyName={party.name} />
  ))
}

function CreatePartyButton() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Create Party')
      }}
      style={{
        position: 'absolute',
        right: '6%',
        bottom: '4%'
      }}
    >
      <AddCircleIcon width={80} height={80} fill="#ff2559" />
    </TouchableOpacity>
  )
}

function PartyListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CreatePartyButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyListScreen
