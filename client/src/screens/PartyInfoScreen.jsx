import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import MoreVertIcon from '../../assets/images/more_vert-24px.svg'
import AddCircleIcon from '../../assets/images/add_circle_outline-24px.svg'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import API from '../utils/API'
import { H3 } from '../components/Header'

function MemberListItem(props) {
  return (
    // add navigation to profile?
    <Text style={{ fontFamily: 'Roboto', fontSize: 20, textAlign: 'left' }}>
      {props.name} {'\n'}{' '}
    </Text>
  )
}

function EventListItem(props) {
  return (
    // add navigation to workout page?
    <Text style={{ fontFamily: 'Roboto', fontSize: 20, textAlign: 'left' }}>
      {props.name} {'\n'}{' '}
    </Text>
  )
}

function AddWorkoutButton(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Create Event', {
          partyID: props.partyID
        })
      }
      style={{ width: 50, height: 50, marginTop: 10, marginLeft: 15 }}
    >
      <AddCircleIcon width={40} height={40} fill="black" />
    </TouchableOpacity>
  )
}

function PartySettingsButton({ partyID, partyName, members, routeKey }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Party Settings', {
          partyID: partyID,
          partyName: partyName,
          members: members,
          routeKey: routeKey
        })
      }
      style={{ width: 50, marginTop: 10, marginLeft: 5 }}
    >
      <MoreVertIcon width={40} height={40} fill="black" />
    </TouchableOpacity>
  )
}

class PartyInfoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      members: [],
      workouts: []
    }
    this._isMounted = false
    this.navigation = props.navigation
  }

  componentDidMount() {
    if (!this._isMounted) {
      try {
        API.getWorkoutParty(this.props.route.params.partyID).then(
          async (data) => {
            const mIDs = data.members
            const wIDs = data.workouts
            await Promise.all(
              mIDs.map(async (id) => await API.getUser(id))
            ).then((users) => {
              const members = users.map((user) => {
                return { id: user._id, name: user.username }
              })
              this.setState({ members: members })
            })
            await Promise.all(
              wIDs.map(async (id) => await API.getWorkout(id))
            ).then((workouts) => {
              const ws = workouts.map((w) => {
                return w.name
              })
              this.setState({ workouts: ws, loading: false })
            })
          }
        )
        this._isMounted = true
      } catch (error) {
        console.log(error)
      }
    }
  }

  componentDidUpdate() {
    if (this._isMounted) {
      const { route } = this.props
      if (route.params && route.params.forceUpdate) {
        this.setState({ members: this.props.route.params.members })
        this.navigation.setParams({ forceUpdate: false })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const memberList = this.state.members.map((m) => (
      <MemberListItem key={m.id} name={m.name} />
    ))

    const eventList = this.state.workouts.map((w) => <EventListItem name={w} />)

    return (
      <ScrollView style={styles.container}>
        <H3>{this.props.route.params.partyName}</H3>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 15,
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'left',
            fontSize: 25
          }}
        >
          Member List:
        </Text>

        <ScrollView
          style={{
            borderWidth: 2,
            borderColor: '#20232a',
            margin: 8,
            marginBottom: 0,
            padding: 5,
            width: '95%',
            height: 250
          }}
        >
          <Text> {memberList} </Text>
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 15,
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'left',
              fontSize: 25
            }}
          >
            Upcoming Events:
          </Text>
          <AddWorkoutButton />
          <PartySettingsButton
            partyID={this.props.route.params.partyID}
            partyName={this.props.route.params.partyName}
            members={this.state.members}
            routeKey={this.props.route.key}
          />
        </View>
        <ScrollView
          style={{
            borderWidth: 2,
            borderColor: '#20232a',
            marginLeft: 8,
            marginRight: 8,
            padding: 5,
            width: '95%',
            height: 250
          }}
        >
          <Text> {eventList} </Text>
        </ScrollView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyInfoScreen
