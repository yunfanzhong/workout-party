import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import OutlinedButton from '../components/OutlinedButton'
import RedButton from '../components/RedButton'
import API from '../utils/API'
import AccountIcon from '../../assets/images/account_circle-24px.svg'

function Member({ name }) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.friend}>
        <View style={{ flexDirection: 'row' }}>
          <AccountIcon width={40} height={40} fill="black" marginRight={10} />
          <Text style={styles.friendText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function MemberList({ memberList }) {
  const arr = []

  // for (const member of memberList) {
  //   if (member.username.toLowerCase().startsWith(searchValue.toLowerCase())) {
  //     arr.push(friend)
  //   }
  // }

  const list = memberList.map((member) => (
    <Member key={member.id} name={member.name} />
  ))
  return <ScrollView>{list}</ScrollView>
}

class PartySettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      refreshing: true
    }
    this.id = props.route.params.partyID
    this._isMounted = false
  }

  componentDidMount() {
    if (!this._isMounted) {
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
  }

  componentWillUnmount() {
    this._isMounted = false
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
        <ScrollView
          style={{ marginVertical: 24, height: '80%', width: '80%' }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <MemberList memberList={this.state.members} />
        </ScrollView>
        <RedButton
          style={{ width: '50%', marginBottom: 12 }}
          text="Add Member"
        />
        <OutlinedButton
          style={{ width: '50%', marginBottom: 24 }}
          text="Remove Members"
        />
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
