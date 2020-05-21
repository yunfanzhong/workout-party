import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Alert
} from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'

import AccountIcon from '../../assets/images/account_circle-24px.svg'
import AddFriend from '../../assets/images/person_add-24px.svg'
import UserContext from '../context/UserContext'

const UserFriend = (props) => {
  return (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row' }}>
        <AccountIcon width={30} height={30} fill="black" marginRight={10} />
        <Text style={styles.friendText}>{props.name}</Text>
      </View>
    </View>
  )
}

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
      >
        <AddFriend height={30} width={30} marginTop={15} fill="black" />
        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 15 }}>
          Add Friend
        </Text>
      </TouchableOpacity>
      <FriendsList friendsList={props.friendsList} />
    </View>
  )
}

const FriendsList = (props) => {
  const friendsList = props.friendsList
  const list = friendsList.map((friendUser) => (
    <UserFriend name={friendUser.name} key={friendUser.name} />
  ))
  return <ScrollView>{list}</ScrollView>
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

function AccountScreen({ navigation }) {
  const [friendButtonColor, setFriendButtonColor] = React.useState('grey')
  const [settingButtonColor, setSettingButtonColor] = React.useState('white')
  const [showFriendMenu, setShowFriendMenu] = React.useState(true)
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
    if (number > 40) return ranks[7]
    return ranks[Math.floor(number / 5)]
  }

  const changeButtonColors = () => {
    friendButtonColor === 'white'
      ? setFriendButtonColor('grey')
      : (setFriendButtonColor('white'), setShowFriendMenu(false))
    settingButtonColor === 'white'
      ? setSettingButtonColor('grey')
      : (setSettingButtonColor('white'), setShowFriendMenu(true))
  }

  return (
    <UserContext.Consumer>
      {(context) => (
        <View style={styles.container}>
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
                  backgroundColor: friendButtonColor,
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
                  backgroundColor: settingButtonColor,
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
            {showFriendMenu ? (
              <FriendMenu friendsList={context.user.friendsList} />
            ) : (
              <SettingsMenu />
            )}
          </View>
        </View>
      )}
    </UserContext.Consumer>
  )
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
