import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native'
import React from 'react'
import AddCircleIcon from '../../assets/images/add_circle-24px.svg'
import GroupIcon from '../../assets/images/group-24px.svg'
import ListItem from '../components/ListItem.jsx'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../context/UserContext'
import API from '../utils/API'

function PartyListItem(props) {
  const navigation = useNavigation()

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Party Info', {
          partyName: props.name,
          partyID: props.id
        })
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginLeft: '10%',
          alignItems: 'center'
        }}
      >
        <GroupIcon width={40} height={40} marginRight={10} fill="black" />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 18,
              textAlign: 'left'
            }}
          >
            {props.name}
          </Text>
          <Text>{props.numMembers} people</Text>
        </View>
      </View>
    </ListItem>
  )
}

function CreatePartyButton() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Create Party')
      }}
      style={{
        position: 'absolute',
        right: '6%',
        bottom: '4%'
      }}
    >
      <AddCircleIcon width={80} height={80} fill="#ff2559" />
    </TouchableOpacity>
  )
}

class PartyListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workoutParties: [],
      refreshing: true
    }
    this._isMounted = false
    this.navigation = props.navigation
  }

  async componentDidMount() {
    if (!this._isMounted) {
      try {
        const result = await API.getWorkoutParty()
        this.setState({
          workoutParties: result
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

  componentDidUpdate() {
    if (this._isMounted) {
      const { route } = this.props
      if (route.params && route.params.forceUpdate) {
        this.navigation.setParams({ forceUpdate: false })
        this._onRefresh()
      }
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })
    try {
      const result = await API.getWorkoutParty()
      this.setState({
        workoutParties: result
      })
      this._isMounted = true
      this.setState({ refreshing: false })
    } catch (error) {
      console.log(error)
      this._isMounted = true
    }
  }

  render() {
    const sortedArr = this.state.workoutParties.sort((a, b) => {
      if (a.name < b.name) return -1
      else if (a.name > b.name) return 1
      return 0
    })

    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            marginTop: 18,
            marginBottom: 18
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <UserContext.Consumer>
            {(context) =>
              sortedArr.map(
                (party) =>
                  party.members.includes(context.user._id) && (
                    <PartyListItem
                      key={party._id}
                      name={party.name}
                      id={party._id}
                      numMembers={party.members.length}
                    />
                  )
              )
            }
          </UserContext.Consumer>
        </ScrollView>
        <CreatePartyButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyListScreen
