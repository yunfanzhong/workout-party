import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import AccountIcon from '../../assets/images/account_circle-24px.svg'

const UserFriend = (props) => {
  return (
    <View style={styles.friend}>
      <TouchableOpacity
        onPress={() =>
          props.onPress({
            _id: props.friend._id,
            username: props.friend.username
          })
        }
      >
        <View style={{ flexDirection: 'row' }}>
          <AccountIcon width={40} height={40} fill="black" marginRight={10} />
          <Text style={styles.friendText}>{props.friend.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const FriendsList = (props) => {
  const friendsList = props.friendsList
  const list = friendsList.map((friendUser) => (
    <UserFriend
      friend={friendUser}
      key={friendUser._id}
      onPress={props.onPress}
    />
  ))
  return <ScrollView>{list}</ScrollView>
}

const styles = StyleSheet.create({
  friendText: {
    fontSize: 18,
    textAlignVertical: 'center'
  },
  friend: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginBottom: '1%'
  }
})

export default FriendsList
