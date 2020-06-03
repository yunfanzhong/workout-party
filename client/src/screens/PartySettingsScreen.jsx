import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  RefreshControl
} from 'react-native'
import React from 'react'
import OutlinedButton from '../components/OutlinedButton'
import RedButton from '../components/RedButton'
import UserContext from '../context/UserContext'
import ListItem from '../components/ListItem'
import API from '../utils/API'

function MemberListItem(props) {
  return (
    <ListItem onPress={() => {}}>
      <Text>{props.name}</Text>
    </ListItem>
  )
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

  async componentDidMount() {
    if (!this._isMounted) {
      try {
        const result = await API.getWorkoutParty(this.id)
        this.setState({
          members: result.members
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
    API.getWorkoutParty(this.state.id).then((result) => {
      this.setState({
        members: result.members,
        refreshing: false
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ marginTop: 24, marginBottom: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Text>{this.state.members}</Text>
        </ScrollView>
        <View style={{ alignItems: 'center', marginVertical: 4 }}>
          <RedButton text="Add Member" />
        </View>
        <View style={{ alignItems: 'center', marginVertical: 4 }}>
          <OutlinedButton text="Leave Party" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
})

export default PartySettingsScreen
