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
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '5%',
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
    <View marginLeft={10} marginRight={10} style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() =>
          props.onPress({
            _id: props.member._id,
            username: props.member.username
          })
        }
        style={{
          alignItems: 'center'
        }}
      >
        <AccountIcon width={40} height={40} fill="black" />
        <Text>{props.member.username}</Text>
      </TouchableOpacity>
    </View>
  )
}

function PartyMemberList(props) {
  const memberList = props.memberList

  const list = memberList.map((member) => (
    <PartyMember member={member} onPress={props.onPress} key={member._id} />
  ))
  return (
    <ScrollView marginHorizontal="10%" horizontal={true}>
      {list}
    </ScrollView>
  )
}

class CreatePartyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberList: [],
      friendsList: props.friends
    }
    this.navigation = props.navigation
  }

  addMember(member) {
    const memberList = this.state.memberList
    memberList.push(member)
    this.setState({ memberList: memberList })

    let friendsList = this.state.friendsList
    let idx = friendsList.findIndex((friend) => friend._id === member._id)
    friendsList.splice(idx, 1)
    this.setState({ friendsList: friendsList })
  }

  removeMember(friend) {
    const friendsList = this.state.friendsList
    friendsList.push(friend)
    this.setState({ friendsList: friendsList })

    let memberList = this.state.memberList
    let idx = memberList.findIndex((member) => member._id === friend._id)
    memberList.splice(idx, 1)
    this.setState({ memberList: memberList })
  }

  render() {
    return (
      <View style={styles.container}>
        <PartyNameInput />
        <View style={{ flex: this.state.memberList.length > 0 ? 1 : 0 }}>
          <PartyMemberList
            memberList={this.state.memberList}
            onPress={(friend) => this.removeMember(friend)}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            marginBottom: '5%'
          }}
        >
          <RedButton
            text="Confirm group"
            onPress={() => {
              this.navigation.goBack()
            }}
          />
        </View>
        <View
          style={{
            flex: 4,
            marginHorizontal: '5%',
            backgroundColor: '#fff'
          }}
        >
          <FriendsList
            friendsList={this.state.friendsList}
            onPress={(member) => this.addMember(member)}
          />
        </View>
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
