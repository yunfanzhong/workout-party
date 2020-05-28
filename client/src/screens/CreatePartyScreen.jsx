import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView
} from 'react-native'
import React from 'react'
import FriendsList from '../components/FriendsList.jsx'
import UserContext from '../context/UserContext'
import AccountIcon from '../../assets/images/account_circle-24px.svg'
import RedButton from '../components/RedButton'

function PartyNameInput() {
  const [value, onChangeText] = React.useState('')

  return (
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
  )
}

function PartyMember(props) {
  return (
    <View style={{ alignItems: 'center' }}>
      <AccountIcon fill="black" />
      <Text>{props.name}</Text>
    </View>
  )
}

function PartyMemberList(props) {
  const memberList = props.memberList

  const list = memberList.map((member) => (
    <PartyMember name={member.username} key={member._id} />
  ))
  return <ScrollView horizontal={true}>{list}</ScrollView>
}

class CreatePartyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberList: [],
      friends: props.friends
    }
    this.navigation = props.navigation
  }

  addMember(member) {
    const memberList = this.state.memberList
    memberList.push(member)
    this.setState({ memberList: memberList })
  }

  render() {
    return (
      <View style={styles.container}>
        <PartyNameInput />
        <PartyMemberList memberList={this.state.memberList} />

        <View
          style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}
        >
          <RedButton
            text="Confirm group"
            onPress={() => {
              this.navigation.goBack()
            }}
          />
        </View>

        <FriendsList
          friendsList={this.state.friends}
          onPress={(member) => {
            this.addMember(member)
            console.log('MEMBER')
            console.log(member)
            let friends = this.state.friends
            let idx = friends.findIndex((friend) => friend._id === member._id)
            friends.splice(idx, 1)
            console.log('FRIENDS')
            console.log(friends)
            this.setState({ friends: friends })
          }}
        />
      </View>
    )
  }
}

function CreatePartyScreenWrapper(props) {
  return (
    <UserContext.Consumer>
      {(context) => (
        <CreatePartyScreen
          friends={context.user.friends.slice()}
          navigation={props.navigation}
        />
      )}
    </UserContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default CreatePartyScreenWrapper
