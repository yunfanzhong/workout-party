import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../context/UserContext'
import API from '../utils/API'
import FullPageSpinner from '../components/FullPageSpinner'
import Bubble from '../components/Bubble'

function PartyListItem(props) {
  const navigation = useNavigation()

  return (
    <Bubble
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
          alignItems: 'center'
        }}
      >
        <Icon name="group" size={32} color="#565a5e" />
        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 12 }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 18,
              textAlign: 'left'
            }}
          >
            {props.name}
          </Text>
          <Text style={{ color: 'gray' }}>{props.numMembers} people</Text>
        </View>
      </View>
    </Bubble>
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
        right: 24,
        bottom: 24
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#ededed',
          borderRadius: 32,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.8,
          elevation: 6,
          padding: 8
        }}
      >
        <Icon name="add" size={48} color="#ff2559" />
      </View>
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
    this.props.navigation.addListener('focus', this._onRefresh)
  }

  componentWillUnmount() {
    this._isMounted = false
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

    if (this.state.refreshing) {
      return <FullPageSpinner />
    }

    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ padding: 24 }}
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
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
})

export default PartyListScreen
