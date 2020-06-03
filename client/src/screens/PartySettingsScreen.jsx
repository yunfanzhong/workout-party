import { ScrollView, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import OutlinedButton from '../components/OutlinedButton'
import RedButton from '../components/RedButton'
import UserContext from '../context/UserContext'
import API from '../utils/API'

class PartySettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      partyMembers: [],
      refreshing: true,
      id: props.route.params.id
    }
    this._isMounted = false
  }

  async componentDidMount() {
    if (!this._isMounted) {
      try {
        console.log('mounted')
      } catch {
        console.log('could not mount')
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
