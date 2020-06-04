import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import UserContext from '../context/UserContext'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RedButton from '../components/RedButton'
import BlankModal from '../components/BlankModal'
import FormInput from '../components/FormInput'
import { H3 } from '../components/Header'
import API from '../utils/API'
import ErrorText from '../components/ErrorText'
import Bubble from '../components/Bubble.jsx'
import OutlinedButton from '../components/OutlinedButton'

function PartyNameInput(props) {
  const [value, onChangeText] = React.useState('')

  return (
    <FormInput
      onChangeText={(text) => {
        onChangeText(text)
        props.onChangeText(text)
      }}
      value={value}
      placeholder="Find friends to add"
    />
  )
}

function PartyMember(props) {
  return (
    <View
      marginLeft={10}
      marginRight={10}
      width={65}
      height={100}
      style={{ alignItems: 'center' }}
    >
      <TouchableOpacity
        onPress={() =>
          props.onPress({
            _id: props.member._id,
            username: props.member.username
          })
        }
        style={{
          alignItems: 'center'
        }}
      >
        <View>
          <Icon name="face" size={60} color="black" />
          <Icon
            style={{
              position: 'absolute',
              right: 0
            }}
            name="cancel"
            size={20}
            color="red"
          />
        </View>
        <Text numberOfLines={1}>{props.member.username}</Text>
      </TouchableOpacity>
    </View>
  )
}

function PartyMemberList(props) {
  const memberList = props.memberList

  const list = memberList.map((member) => (
    <PartyMember member={member} onPress={props.onPress} key={member._id} />
  ))
  return (
    <ScrollView
      marginHorizontal="10%"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {list}
    </ScrollView>
  )
}

const EmptyGroupModal = ({ visible, setVisible }) => {
  return (
    <BlankModal visible={visible} setVisible={setVisible}>
      <Text style={{ textAlign: 'center', width: '100%', fontSize: 18 }}>
        Select friends to add first!
      </Text>
    </BlankModal>
  )
}

const ConfirmGroupModal = ({ visible, setVisible, navigation, members }) => {
  const [name, setName] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)

  return (
    <BlankModal visible={visible} setVisible={setVisible}>
      <H3>Set Party Name</H3>
      <Text>Party Name</Text>
      <FormInput
        onChangeText={(text) => {
          setName(text)
          setErrorVisible(false)
        }}
      />
      {errorVisible && <ErrorText>Please enter a name!</ErrorText>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          marginVertical: 4
        }}
      >
        <OutlinedButton
          style={{ marginRight: 12 }}
          text="Cancel"
          onPress={() => setVisible(false)}
        />
        <UserContext.Consumer>
          {(context) => (
            <RedButton
              text="Enter"
              onPress={async () => {
                if (name.length === 0) {
                  setErrorVisible(true)
                } else {
                  await API.createWorkoutParty({
                    name: name,
                    members: members
                      .map((member) => member._id)
                      .concat(context.user._id),
                    workouts: []
                  })
                  setVisible(false)
                  navigation.navigate('My Parties', { forceUpdate: true })
                }
              }}
            />
          )}
        </UserContext.Consumer>
      </View>
    </BlankModal>
  )
}

class CreatePartyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberList: [],
      friendsList: props.friends,
      searchValue: '',
      emptyModalVisible: false,
      confirmModalVisible: false
    }
    this.navigation = props.navigation
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (this.state.memberList.length == 0) {
              this.setState({ emptyModalVisible: true })
            } else {
              this.setState({ confirmModalVisible: true })
            }
          }}
          style={{
            marginRight: 16
          }}
        >
          <Icon name="done" size={32} color="white" />
        </TouchableOpacity>
      )
    })
  }

  addMember(member) {
    const memberList = this.state.memberList
    memberList.push(member)
    this.setState({ memberList: memberList })
  }

  removeMember(friend) {
    const idx = this.state.memberList.findIndex(
      (member) => member._id === friend._id
    )
    const memberList = this.state.memberList
      .slice(0, idx)
      .concat(this.state.memberList.slice(idx + 1))
    this.setState({ memberList: memberList })
  }

  filterFriendsList(text) {
    this.setState({ searchValue: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <EmptyGroupModal
          visible={this.state.emptyModalVisible}
          setVisible={(emptyModalVisible) =>
            this.setState({ emptyModalVisible })
          }
        />
        <ConfirmGroupModal
          visible={this.state.confirmModalVisible}
          setVisible={(confirmModalVisible) =>
            this.setState({ confirmModalVisible })
          }
          navigation={this.navigation}
          members={this.state.memberList.slice()}
        />

        <PartyNameInput onChangeText={(text) => this.filterFriendsList(text)} />
        <View
          style={{
            height: this.state.memberList.length > 0 ? 100 : 0
          }}
        >
          <PartyMemberList
            memberList={this.state.memberList}
            onPress={(friend) => this.removeMember(friend)}
          />
        </View>
        <ScrollView>
          {this.state.friendsList
            .filter((friend) => {
              if (
                !friend.username
                  .toLocaleLowerCase()
                  .includes(this.state.searchValue.toLocaleLowerCase())
              ) {
                return false
              }
              for (const member of this.state.memberList) {
                if (friend._id === member._id) {
                  return false
                }
              }
              return true
            })
            .map((member) => (
              <Bubble
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => this.addMember(member)}
                key={member._id}
              >
                <Icon name="face" size={32} color="#565a5e" />
                <Text style={{ fontSize: 18, marginLeft: 12 }}>
                  {member.username}
                </Text>
              </Bubble>
            ))}
        </ScrollView>
      </View>
    )
  }
}

function CreatePartyScreenWrapper(props) {
  return (
    <UserContext.Consumer>
      {(context) => (
        <CreatePartyScreen
          friends={context.user.friends.slice()}
          navigation={props.navigation}
        />
      )}
    </UserContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 18
  }
})

export default CreatePartyScreenWrapper
