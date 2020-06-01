import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native'
import React from 'react'
import RedButton from '../components/RedButton.jsx'
import AddCircleIcon from '../../assets/images/add_circle-24px.svg'
import ListItem from '../components/ListItem.jsx'
import { useNavigation } from '@react-navigation/native'
import API from '../utils/API'

function PartyListItem(props) {
  const navigation = useNavigation()

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Party Info', { partyName: props.name })
      }}
    >
      <Text>{props.name}</Text>
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
      refreshing: false
    }
    this._isMounted = false
  }

  async componentDidMount() {
    if (!this._isMounted) {
      try {
        const result = await API.getWorkoutParty()
        this.setState({
          workoutParties: result
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
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    API.getWorkoutParty().then((result) => {
      this.setState({
        workoutParties: result,
        refreshing: false
      })
    })
  }

  render() {
    const sortedArr = this.state.workoutParties.sort((a, b) => {
      if (a.name < b.name) return -1
      else if (a.name > b.name) return 1
      return 0
    })

    const partyList = sortedArr.map((party) => (
      <PartyListItem key={party._id} name={party.name} />
    ))

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
          {partyList}
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
