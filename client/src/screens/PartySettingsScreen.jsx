import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
import OutlinedButton from '../components/OutlinedButton'
import RedButton from '../components/RedButton'
import API from '../utils/API'
import AccountIcon from '../../assets/images/account_circle-24px.svg'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import BlankModal from '../components/BlankModal'
import { H3 } from '../components/Header'
import FriendsList from '../components/FriendsList'
import UserContext from '../context/UserContext'
import { useNavigation } from '@react-navigation/native'

function Member({ name, isRemoving, partyID, id }) {
  const [visible, setVisible] = useState(true)
  const navigation = useNavigation()

  const baseComponent = (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row' }}>
        <AccountIcon width={40} height={40} fill="black" marginRight={10} />
        <Text style={styles.friendText}>{name}</Text>
      </View>
    </View>
  )

  if (!isRemoving) {
    return visible && baseComponent
  } else {
    return (
      visible && (
        <UserContext.Consumer>
          {(context) => (
            <TouchableOpacity
              onPress={async () => {
                setVisible(false)
                try {
                  await API.removeMemberFromParty(partyID, id)
                  if (context.user._id === id) {
                    navigation.navigate('My Parties')
                  }
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              {baseComponent}
            </TouchableOpacity>
          )}
        </UserContext.Consumer>
      )
    )
  }
}

function MemberList({ memberList, isRemoving, partyID }) {
  const list = memberList.map((member) => (
    <Member
      key={member.id}
      name={member.name}
      isRemoving={isRemoving}
      partyID={partyID}
      id={member.id}
    />
  ))
  return <ScrollView>{list}</ScrollView>
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

class PartySettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      refreshing: true,
      name: '',
      keyboardOpen: false,
      isRemoving: false,
      modalVisible: false,
      buttonText: 'Remove Members'
    }
    this.id = props.route.params.partyID
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
          this.setState({ name: result.name })
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
      API.getWorkoutParty(this.id).then((result) => {
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
              this.setState({ members: members })
            } else {
              console.log('member already added!')
            }
          }}
        />
        <View style={{ marginTop: 24, width: '80%' }}>
          <FormLabel style={{ textAlign: 'center' }}>Change Name</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={(value) => this.setState({ name: value })}
          />
          <View style={{ alignItems: 'center' }}>
            <OutlinedButton
              icon="check"
              text="Confirm"
              onPress={() => {
                API.updateWorkoutParty(this.id, { name: this.state.name })
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <FormLabel style={{ textAlign: 'center' }}>Manage Members</FormLabel>
        </View>
        <ScrollView
          style={{
            marginBottom: 24,
            height: '80%',
            width: '80%',
            borderWidth: 1,
            borderColor: '#ededed',
            borderRadius: 8,
            paddingVertical: 8
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <MemberList
            memberList={this.state.members}
            isRemoving={this.state.isRemoving}
            partyID={this.id}
          />
        </ScrollView>
        {!this.state.keyboardOpen && (
          <RedButton
            style={{ width: '50%', marginBottom: 12 }}
            text="Add Member"
            onPress={() => this.setState({ modalVisible: true })}
          />
        )}
        {!this.state.keyboardOpen && (
          <OutlinedButton
            style={{ width: '50%', marginBottom: 24 }}
            text={this.state.buttonText}
            onPress={() => {
              const newIsRemoving = !this.state.isRemoving
              let newText

              if (this.state.buttonText === 'Remove Members')
                newText = 'Stop Removing'
              else newText = 'Remove Members'

              this.setState({ isRemoving: newIsRemoving, buttonText: newText })
            }}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
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

export default PartySettingsScreen
