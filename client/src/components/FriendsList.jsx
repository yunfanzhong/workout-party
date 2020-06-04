import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const UserFriend = ({ onPress, friend, button }) => {
  const baseComponent = (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="person" size={32} color="#565a5e" />
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
    textAlignVertical: 'center',
    marginLeft: 12
  },
  friend: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginBottom: 4
  }
})

export default FriendsList
