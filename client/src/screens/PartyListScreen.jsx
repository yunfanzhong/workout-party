import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyListScreen
