import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput
} from 'react-native'
import React from 'react'
import FriendsList from '../components/FriendsList.jsx'
import UserContext from '../context/UserContext'

function PartyNameInput() {
  const [value, onChangeText] = React.useState('')

  return (
    <View>
      <TextInput
        style={{
          height: 50,
          borderRadius: 15,
          margin: '10%',
          backgroundColor: '#c4c4c4',
          paddingLeft: 10,
          paddingRight: 10
        }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholderTextColor="#808080"
        placeholder="Find friends to add"
      />

      <UserContext.Consumer>
        {(context) => <FriendsList friendsList={context.user.friendsList} />}
      </UserContext.Consumer>
    </View>
  )
}

function CreatePartyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <PartyNameInput />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default CreatePartyScreen
