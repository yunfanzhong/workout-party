import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import API from '../utils/API'
import { H3 } from '../components/Header'
import FullPageSpinner from '../components/FullPageSpinner'
import Bubble from '../components/Bubble'

function MemberListItem(props) {
  return (
    <Bubble style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="face" size={32} color="#565a5e" />
      <Text style={{ marginLeft: 12 }}>{props.name}</Text>
    </Bubble>
  )
}

function EventListItem(props) {
  return (
    <Bubble style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="event" size={32} color="#565a5e" />
      <Text style={{ marginLeft: 12 }}>{props.name}</Text>
    </Bubble>
  )
}

function AddWorkoutButton({ partyID }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Create Event', {
          partyID
        })
      }
    >
      <Icon name="add" size={32} color="#ff2559" />
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
    this.navigation = props.navigation
  }

  handleEdit = () => {
    if (!this.state.loading) {
      this.props.navigation.navigate('Party Settings', {
        partyID: this.props.route.params.partyID,
        partyName: this.props.route.params.partyName,
        members: this.state.members,
        routeKey: this.props.route.key
      })
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.handleEdit()}
          style={{
            marginRight: 16
          }}
        >
          <Icon name="edit" size={32} color="white" />
        </TouchableOpacity>
      ),
      title: this.props.route.params.partyName
    })
    const refreshPage = () => {
      if (!this.state.loading) {
        this.setState({ loading: true })
      }
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
      } catch (error) {
        console.log(error)
      }
    }
    this.props.navigation.addListener('focus', refreshPage)
    refreshPage()
  }

  componentDidUpdate() {
    const { route } = this.props
    if (route.params && route.params.forceUpdate) {
      this.setState({ members: this.props.route.params.members })
      this.navigation.setParams({ forceUpdate: false })
    }
  }

  render() {
    if (this.state.loading) {
      return <FullPageSpinner />
    }

    return (
      <View style={styles.container}>
        <View style={{ height: '50%' }}>
          <H3 style={{ textAlign: 'left' }}>Members</H3>
          <ScrollView>
            {this.state.members.map((m) => (
              <MemberListItem key={m.id} name={m.name} />
            ))}
          </ScrollView>
        </View>
        <View style={{ height: '50%' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}
          >
            <H3 style={{ textAlign: 'left', width: 'auto', marginBottom: 0 }}>
              Events
            </H3>
            <AddWorkoutButton partyID={this.props.route.params.partyID} />
          </View>
          <ScrollView>
            {this.state.workouts.map((w) => (
              <EventListItem name={w} />
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 18
  }
})

export default PartyInfoScreen
