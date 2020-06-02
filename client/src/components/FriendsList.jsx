import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import AccountIcon from '../../assets/images/account_circle-24px.svg'

const UserFriend = ({ onPress, friend, button }) => {
  const baseComponent = (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row' }}>
        <AccountIcon width={40} height={40} fill="black" marginRight={10} />
        <Text style={styles.friendText}>{friend.username}</Text>
      </View>
    </View>
  )

  if (button) {
    return (
      <TouchableOpacity
        onPress={() =>
          onPress({
            _id: friend._id,
            username: friend.username
          })
        }
      >
        {baseComponent}
      </TouchableOpacity>
    )
  } else {
    return baseComponent
  }
}

const FriendsList = ({ searchValue = '', friendsList, button, onPress }) => {
  const arr = []

  for (const friend of friendsList) {
    if (friend.username.toLowerCase().startsWith(searchValue.toLowerCase())) {
      arr.push(friend)
    }
  }

  const list = arr.map((friend) => (
    <UserFriend
      friend={friend}
      key={friend._id}
      button={button}
      onPress={onPress}
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
