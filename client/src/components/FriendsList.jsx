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
      <TouchableOpacity onPress={props.onPress}>
        <View style={{ flexDirection: 'row' }}>
          <AccountIcon width={30} height={30} fill="black" marginRight={10} />
          <Text style={styles.friendText}>{props.name}</Text>
        </View>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
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

export default FriendsList
