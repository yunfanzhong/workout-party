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
  const baseComponent = (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row' }}>
        <AccountIcon width={40} height={40} fill="black" marginRight={10} />
        <Text style={styles.friendText}>{props.friend.username}</Text>
      </View>
    </View>
  )

  if (props.button) {
    return (
      <TouchableOpacity
        onPress={() =>
          props.onPress({
            _id: props.friend._id,
            username: props.friend.username
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

const FriendsList = (props) => {
  const arr = []
  const searchValue = props.searchValue || ''

  for (friend of props.friendsList) {
    if (friend.username.toLowerCase().startsWith(searchValue.toLowerCase())) {
      arr.push(friend)
    }
  }

  const list = arr.map((friend) => (
    <UserFriend
      friend={friend}
      key={friend._id}
      button={props.button}
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
