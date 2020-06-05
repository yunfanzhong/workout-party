import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import OutlinedButton from '../components/OutlinedButton'
import API from '../utils/API'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import BlankModal from '../components/BlankModal'
import { H3 } from '../components/Header'
import FriendsList from '../components/FriendsList'
import UserContext from '../context/UserContext'
import { useNavigation, CommonActions } from '@react-navigation/native'
import Bubble from '../components/Bubble'
import Text from '../components/Text'

function Member({
  name,
  isRemoving,
  partyID,
  id,
  memberList,
  routeKey,
  onPress
}) {
  const [visible, setVisible] = useState(true)
  const navigation = useNavigation()
  let members = memberList

  return (
    <Bubble>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="face"
            size={32}
            color="#565a5e"
            style={{ marginRight: 12 }}
          />
          <Text style={styles.friendText}>{name}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Icon name="remove" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </Bubble>
  )

  // if (!isRemoving) {
  //   return visible && baseComponent
  // } else {
  //   return (
  //     visible && (
  //       <UserContext.Consumer>
  //         {(context) => (
  //           <TouchableOpacity
  //             onPress={async () => {
  //               setVisible(false)
  //               try {
  //                 await API.removeMemberFromParty(partyID, id)
  //                 if (context.user._id === id) {
  //                   navigation.navigate('My Parties', { forceUpdate: true })
  //                 }
  //                 let i = 0

  //                 for (; i < members.length; i++)
  //                   if (members[i].id === id) break
  //                 if (i > -1) members.splice(i, 1)

  //                 // navigation.dispatch({
  //                 //   ...CommonActions.setParams({
  //                 //     members: members,
  //                 //     forceUpdate: true
  //                 //   }),
  //                 //   source: routeKey
  //                 // })
  //               } catch (error) {
  //                 console.log(error)
  //               }
  //             }}
  //           >
  //             {baseComponent}
  //           </TouchableOpacity>
  //         )}
  //       </UserContext.Consumer>
  //     )
  //   )
  // }
}

function MemberList({
  memberList,
  isRemoving,
  partyID,
  routeKey,
  handleRemove
}) {
  const list = memberList.map((member) => (
    <Member
      key={member.id}
      name={member.name}
      isRemoving={isRemoving}
      partyID={partyID}
      id={member.id}
      memberList={memberList}
      routeKey={routeKey}
      onPress={() => handleRemove(member.id)}
    />
  ))
  return list
}

const AddMemberModal = ({ visible, setVisible, onPress }) => {
  const [searchValue, changeSearch] = useState('')

  return (
    <BlankModal visible={visible} setVisible={setVisible}>
      <H3>Add Member</H3>
      <FormInput
        value={searchValue}
        onChangeText={(value) => changeSearch(value)}
      />
      <FormLabel>Friends</FormLabel>
      <UserContext.Consumer>
        {(context) => (
          <FriendsList
            searchValue={searchValue}
            friendsList={context.user.friends}
            button={true}
            onPress={onPress}
          />
        )}
      </UserContext.Consumer>
    </BlankModal>
  )
}

function ConfirmPartyName({ id, name, routeKey, onPress }) {
  const navigation = useNavigation()

  return (
    <OutlinedButton
      icon="check"
      text="Save"
      onPress={() => {
        API.updateWorkoutParty(id, { name })
        navigation.dispatch({
          ...CommonActions.setParams({
            partyName: name
          }),
          source: routeKey
        })
        onPress()
        Keyboard.dismiss()
      }}
    />
  )
}

class PartySettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: this.props.route.params.members,
      refreshing: false,
      name: props.route.params.partyName,
      keyboardOpen: false,
      isRemoving: false,
      modalVisible: false,
      buttonText: 'Remove Members',
      saved: true
    }
    this.id = props.route.params.partyID
    this.prevRouteKey = props.route.params.routeKey
    this.navigation = props.navigation
    this._isMounted = false
    this.keyboardDidShowListener = null
    this.keyboardDidHideListener = null
  }

  componentDidMount() {
    if (!this._isMounted) {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => this.setState({ keyboardOpen: true })
      )
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => this.setState({ keyboardOpen: false })
      )

      try {
        API.getWorkoutParty(this.id).then((result) => {
          const memberIDs = result.members
          Promise.all(memberIDs.map(async (id) => await API.getUser(id))).then(
            (users) => {
              const members = users.map((user) => {
                return { id: user._id, name: user.username }
              })
              this.setState({ members: members, refreshing: false })
            }
          )
        })

        this._isMounted = true
      } catch (error) {
        console.log(error)
        this._isMounted = true
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    try {
      API.getWorkoutParty(this.props.route.params.partyID).then((result) => {
        const memberIDs = result.members
        Promise.all(memberIDs.map(async (id) => await API.getUser(id))).then(
          (users) => {
            const members = users.map((user) => {
              return { id: user._id, name: user.username }
            })
            this.setState({ members: members })
          }
        )
      })

      this._isMounted = true
      this.setState({ refreshing: false })
    } catch (error) {
      console.log(error)
      this._isMounted = true
    }
  }

  render() {
    console.log(this.state.members)
    return (
      <View style={styles.container}>
        <AddMemberModal
          visible={this.state.modalVisible}
          setVisible={(modalVisible) => this.setState({ modalVisible })}
          onPress={async (member) => {
            const memberIDs = this.state.members.map((member) => member.id)
            if (!memberIDs.includes(member._id)) {
              await API.addMemberToParty(this.id, member._id)
              const members = this.state.members
              const newMember = await API.getUser(member._id)
              members.push({ id: newMember._id, name: newMember.username })
              this.setState({ members: members, modalVisible: false })
              // this.navigation.dispatch({
              //   ...CommonActions.setParams({
              //     members: members,
              //     forceUpdate: true
              //   }),
              //   source: this.prevRouteKey
              // })
            } else {
              console.log('member already added!')
            }
          }}
        />
        <View>
          <FormLabel>Change Name{!this.state.saved && ' (unsaved)'}</FormLabel>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <FormInput
              style={{ width: '70%' }}
              value={this.state.name}
              onChangeText={(value) =>
                this.setState({ name: value, saved: false })
              }
            />
            <View style={{ alignItems: 'center' }}>
              <ConfirmPartyName
                id={this.id}
                name={this.state.name}
                routeKey={this.prevRouteKey}
                onPress={() => this.setState({ saved: true })}
              />
            </View>
          </View>
        </View>
        <FormLabel>Manage Members</FormLabel>
        <UserContext.Consumer>
          {(context) => (
            <MemberList
              memberList={this.state.members.filter(
                (m) => m.id !== context.user._id
              )}
              isRemoving={this.state.isRemoving}
              partyID={this.id}
              routeKey={this.prevRouteKey}
              handleRemove={async (id) => {
                await API.removeMemberFromParty(this.id, id)
                this.setState({
                  members: this.state.members.filter((m) => m.id !== id)
                })
              }}
            />
          )}
        </UserContext.Consumer>
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          {!this.state.keyboardOpen && (
            <OutlinedButton
              text="Add Member"
              onPress={() => {
                this._onRefresh()
                this.setState({
                  isRemoving: false,
                  buttonText: 'Remove Members',
                  modalVisible: true
                })
              }}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 24
  },
  friendText: {
    fontSize: 18,
    textAlignVertical: 'center'
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default PartySettingsScreen
