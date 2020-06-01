import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
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

function PartyList(props) {
  const arr = props.list.map((party) => (
    <PartyListItem key={party._id} name={party.name} />
  ))
  return (
    <ScrollView
      style={{
        marginTop: 18,
        marginBottom: 18
      }}
    >
      {arr}
    </ScrollView>
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
      workoutParties: []
    }
    this.interval = null
    this._isMounted = false
  }

  async componentDidMount() {
    try {
      const result = await API.getWorkoutParty()
      this.setState({
        workoutParties: result
      })
    } catch (error) {
      console.log(error)
    }

    if (!this._isMounted) {
      this.interval = setInterval(async () => {
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
      }, 2000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <View style={styles.container}>
        <PartyList list={this.state.workoutParties} />
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
