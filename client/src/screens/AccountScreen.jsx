import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

import AddFriend from '../../assets/images/person_add-24px.svg'
import UserContext from '../context/UserContext'
import { H3 } from '../components/Header.jsx'
import RedButton from '../components/RedButton.jsx'
import FriendsList from '../components/FriendsList.jsx'
import FormInput from '../components/FormInput.jsx'
import BlankModal from '../components/BlankModal.jsx'
import OutlinedButton from '../components/OutlinedButton'

const FriendMenu = (props) => {
  return (
    <View style={props.style}>
      <H3>My Friends</H3>
      <View style={{ flex: 3, paddingHorizontal: 24 }}>
        <FriendsList friendsList={props.friendsList} onPress={() => {}} />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <OutlinedButton
          text="Add Friend"
          icon="add"
          onPress={props.onPress}
          elevation={2}
        />
      </View>
    </View>
  )
}

class AddFriendModal extends React.Component {
  state = {
    friendName: ''
  }

  handleAddFriend = (text) => {
    this.setState({ friendName: text })
  }

  addNewFriend = async (userID, friendName, context) => {
    try {
      await API.addFriendToUser(friendName)
      this.updateFriendList(friendName, context)
    } catch (err) {
      console.log(err)
    }
  }

  updateFriendList = (friendName, context) => {
    context.update({
      friends: context.user.friends.concat({
        username: friendName
      })
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
              onChangeText={() => this.handleAddFriend(this.value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%'
              }}
            >
              <RedButton text="Cancel" onPress={() => setVisible(false)} />
              <RedButton
                text="Enter"
                onPress={() => {
                  setVisible(false),
                    this.addNewFriend(
                      context.user._id,
                      this.state.friendName,
                      context
                    )
                }}
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
              <Image
                style={styles.profileImage}
                source={require('../../assets/images/avatar.png')}
                fill="black"
              />
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
    flexDirection: 'column'
  },
  profileImageAndInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: '#ededed',
    borderWidth: 1
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 12
  },
  profileImage: { height: 170, width: 146 },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  friendMenu: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 12,
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
