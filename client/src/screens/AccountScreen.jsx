import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput
} from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'

import AddFriend from '../../assets/images/person_add-24px.svg'
import UserContext from '../context/UserContext'
import RedButton from '../components/RedButton.jsx'
import FriendsList from '../components/FriendsList.jsx'

const FriendMenu = (props) => {
  return (
    <View style={{ height: 290 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center'
        }}
        onPress={props.onPress}
      >
        <AddFriend height={30} width={30} marginTop={15} fill="black" />
        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 15 }}>
          Add Friend
        </Text>
      </TouchableOpacity>
      <FriendsList friendsList={props.friendsList} onPress={() => {}} />
    </View>
  )
}

const SettingsMenu = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 100,
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          style={{ height: 50, width: 50, marginTop: 15, marginLeft: 40 }}
          source={require('../../assets/images/spotify.png')}
        />
        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 15 }}>
          Connect your Spotify account!
        </Text>
      </TouchableOpacity>
    </View>
  )
}

class AccountScreen extends React.Component {
  state = {
    friendButtonColor: 'grey',
    settingButtonColor: 'white',
    showFriendMenu: true,
    modalVisible: false
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

    const changeButtonColors = () => {
      this.state.friendButtonColor === 'white'
        ? this.setState({
            friendButtonColor: 'grey',
            settingButtonColor: 'white',
            showFriendMenu: true
          })
        : this.setState({
            friendButtonColor: 'white',
            settingButtonColor: 'grey',
            showFriendMenu: false
          })
    }

    const getUserRank = (number) => {
      if (number > 40) return ranks[7]
      return ranks[Math.floor(number / 5)]
    }

    const displayAddFriend = () => {
      this.setState({ modalVisible: true })
    }

    return (
      <UserContext.Consumer>
        {(context) => (
          <View style={styles.container}>
            <Modal
              animationType="fade"
              visible={this.state.modalVisible}
              transparent={true}
            >
              <View
                style={{
                  marginTop: 56,
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.6)'
                }}
              >
                <View
                  style={{
                    height: 280,
                    width: '80%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    marginTop: 80
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 40,
                      marginTop: 10
                    }}
                  >
                    Add a Friend!
                  </Text>
                  <View
                    style={{
                      marginHorizontal: '10%',
                      marginTop: 40
                    }}
                  >
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="always"
                      clearTextOnFocus={true}
                      autoFocus={true}
                      placeholder="Username"
                      textAlign="center"
                      style={{
                        height: 50,
                        borderColor: '#ff2559',
                        borderWidth: 2
                      }}
                    ></TextInput>
                  </View>
                  <View
                    style={{
                      marginTop: 60,
                      height: 50,
                      flexDirection: 'row',
                      width: '100%'
                    }}
                  >
                    <RedButton
                      text="Cancel"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                    <RedButton
                      text="Enter"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                  </View>
                </View>
              </View>
            </Modal>
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
            <View style={styles.buttonPair}>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={{
                    backgroundColor: this.state.friendButtonColor,
                    height: 50,
                    marginLeft: '20%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: 'grey',
                    justifyContent: 'center'
                  }}
                  underlayColor="grey"
                  onPress={() => {
                    changeButtonColors()
                  }}
                >
                  <View>
                    <Text style={styles.buttonText}>Friends List</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={{
                    backgroundColor: this.state.settingButtonColor,
                    height: 50,
                    marginRight: '20%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: 'grey',
                    justifyContent: 'center'
                  }}
                  underlayColor="grey"
                  onPress={() => {
                    changeButtonColors()
                  }}
                >
                  <View>
                    <Text style={styles.buttonText}>Settings</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View
              style={{
                width: '80%',
                marginLeft: '10%',
                height: '51%'
              }}
            >
              {this.state.showFriendMenu ? (
                <FriendMenu
                  friendsList={context.user.friendsList}
                  onPress={() => displayAddFriend()}
                />
              ) : (
                <SettingsMenu />
              )}
            </View>
          </View>
        )}
      </UserContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  profileImageAndInfo: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 30
  },
  profileInfo: { flexDirection: 'column', marginLeft: 30, marginTop: 30 },
  profileImage: { height: 170, width: 146 },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
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
  buttonPair: {
    marginTop: 80,
    height: 50,
    flexDirection: 'row',
    width: '100%'
  },
  buttonContainer: {
    width: '50%'
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
