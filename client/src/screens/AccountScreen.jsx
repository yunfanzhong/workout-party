import { Text, View, Image, StyleSheet, Alert } from 'react-native'
import React from 'react'

import UserContext from '../context/UserContext'
import { H3 } from '../components/Header.jsx'
import RedButton from '../components/RedButton.jsx'
import FriendsList from '../components/FriendsList.jsx'
import FormInput from '../components/FormInput.jsx'
import BlankModal from '../components/BlankModal.jsx'
import OutlinedButton from '../components/OutlinedButton'
import API from '../utils/API'

const FriendMenu = (props) => {
  return (
    <View style={props.style}>
      <H3>My Friends</H3>
      <View style={{ flexGrow: 1, paddingHorizontal: 24 }}>
        <FriendsList
          friendsList={props.friendsList}
          onPress={() => {}}
          showBlankText
        />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <OutlinedButton
          text="Add Friend"
          icon="person-add"
          onPress={props.onPress}
        />
      </View>
    </View>
  )
}

class AddFriendModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      friendName: '',
      loading: false
    }
  }

  handleTextChange = (text) => {
    this.setState({ friendName: text })
  }

  addNewFriend = async (context) => {
    try {
      this.setState({ loading: true })
      const friendID = await API.addFriendToUser(
        context.user._id,
        this.state.friendName
      )
      if (!friendID) {
        throw new Error()
      }
      this.updateFriendList(this.state.friendName, friendID, context)
    } catch (err) {
      Alert.alert('owo', 'We had an error adding this friend :(')
      console.log(err)
      this.setState({ loading: false })
    }
  }

  updateFriendList = (friendName, friendID, context) => {
    this.setState({ friendName: '' }, () => {
      context.update({
        friends: context.user.friends.concat({
          username: friendName,
          _id: friendID
        })
      })
      this.props.setVisible(false)
    })
  }

  render() {
    const { visible, setVisible } = this.props
    return (
      <UserContext.Consumer>
        {(context) => (
          <BlankModal visible={visible} setVisible={setVisible}>
            <H3>Add a Friend!</H3>
            <Text>Username</Text>
            <FormInput
              placeholder="i.e. ilikesocks123"
              value={this.state.friendName}
              autoCapitalize="none"
              onChangeText={(value) => this.handleTextChange(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%'
              }}
            >
              <OutlinedButton
                text="Cancel"
                style={{ marginRight: 12 }}
                onPress={() => setVisible(false)}
              />
              <RedButton
                text="Enter"
                onPress={() => this.addNewFriend(context)}
              />
            </View>
          </BlankModal>
        )}
      </UserContext.Consumer>
    )
  }
}

class AccountScreen extends React.Component {
  state = {
    modalVisible: false,
    faceBookID: null
  }

  render() {
    const ranks = [
      'Couch Potato',
      'Boomer',
      'Bloomer',
      'Zoomer',
      'Fitness Junkie',
      'Bruce Lee',
      'Dwayne "The Rock" Johnson',
      'John Cena'
    ]

    const getUserRank = (number) => {
      if (number >= 40) return ranks[7]
      return ranks[Math.floor(number / 5)]
    }

    const displayAddFriend = () => {
      this.setState({ modalVisible: true })
    }

    return (
      <UserContext.Consumer>
        {(context) => (
          <View style={styles.container}>
            <AddFriendModal
              visible={this.state.modalVisible}
              setVisible={(modalVisible) => this.setState({ modalVisible })}
            />
            <View style={styles.profileImageAndInfo}>
              <View style={{ paddingRight: 12, paddingVertical: 12 }}>
                <Image
                  style={styles.profileImage}
                  source={require('../../assets/images/avatar.png')}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.nameText}>{context.user.displayName}</Text>
                <Text style={styles.userName}>{context.user.username}</Text>
                <Text style={styles.rank}>
                  Rank: {getUserRank(context.user.workoutHistory.length)}
                </Text>
                <Text style={styles.partiesAttended}>
                  Attended {context.user.workoutHistory.length} Parties
                </Text>
              </View>
            </View>
            <FriendMenu
              style={styles.friendMenu}
              friendsList={context.user.friends}
              onPress={() => displayAddFriend()}
            />
          </View>
        )}
      </UserContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    padding: 18
  },
  profileImageAndInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: '#ededed',
    borderWidth: 1,
    marginBottom: 18
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 12
  },
  profileImage: { height: 120, width: 108 },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  friendMenu: {
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: '#ededed',
    borderWidth: 1
  },
  userName: { fontSize: 20, textAlign: 'center' },
  rank: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  partiesAttended: { fontStyle: 'italic', fontSize: 16, textAlign: 'center' },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 24
  },
  friendText: {
    fontSize: 18,
    textAlignVertical: 'center',
    marginBottom: 2
  },
  friend: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: 2
  }
})

export default AccountScreen
