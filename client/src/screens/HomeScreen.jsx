import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import API from '../utils/API'
import UserContext from '../context/UserContext'

function getTimeOfNextOccurrence(day, hour, minute) {
  const time = moment().startOf('isoWeek').day(day).hour(hour).minute(minute)
  if (time < moment()) {
    return time.add(1, 'week')
  }
  return time
}

function HomeScreen() {
  return (
    <UserContext.Consumer>
      {(context) => <HomeScreenContent userID={context.user._id} />}
    </UserContext.Consumer>
  )
}

class HomeScreenContent extends React.Component {
  state = {
    upcomingWorkouts: null
  }

  componentDidMount() {
    API.getUpcomingWorkouts(this.props.userID).then((upcomingWorkouts) => {
      console.log(upcomingWorkouts)
      const workouts = upcomingWorkouts.flatMap((workout) =>
        workout.days.map((day) => ({
          name: workout.name,
          id: workout._id,
          time: getTimeOfNextOccurrence(day, workout.hour, workout.minute)
        }))
      )
      workouts.sort((a, b) => a.time.diff(b.time))
      this.setState({
        upcomingWorkouts: workouts.map(({ name, id, time }) => ({
          name,
          id,
          time: time.format('ddd, MMM D, YY - h:mm A'),
          key: id + time.format()
        }))
      })
    })
  }

  render() {
    if (!this.state.upcomingWorkouts) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size="large" color="#ff2559" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <QuoteText>
          Unfortunately, sitting at your computer 24/7 won't make you any
          slimmer.
        </QuoteText>
        <Text
          style={{
            fontSize: 20,
            marginTop: 24,
            marginBottom: 12,
            fontWeight: 'bold'
          }}
        >
          Upcoming Workouts 🏋️‍♀️
        </Text>
        <View
          style={{
            height: '100%',
            borderRadius: 8,
            flexShrink: 1
          }}
        >
          <ScrollView>
            {this.state.upcomingWorkouts.map(({ key, name, time }) => (
              <UpcomingListItem name={name} time={time} key={key} />
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

function QuoteText({ children }) {
  return (
    <View
      style={{
        padding: 12,
        borderWidth: 1,
        borderColor: '#ff2559',
        borderRadius: 8,
        backgroundColor: '#ffe9ee',
        elevation: 8,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { height: 24 }
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '100',
          fontStyle: 'italic'
        }}
      >
        Quote of the Day
      </Text>

      <Text
        style={{
          fontFamily: 'Roboto',
          fontSize: 20
        }}
      >
        {children}
      </Text>
    </View>
  )
}

function UpcomingListItem({ name, time }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Event', { partyName: name })
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          width: '100%',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ededed',
          borderRadius: 8,
          marginBottom: 8
        }}
      >
        <Icon name="fitness-center" size={32} color="#ff2559" />
        <View style={{ flexDirection: 'column', marginLeft: 12 }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 18,
              textAlign: 'left'
            }}
          >
            {name}
          </Text>
          <Text style={{ color: 'gray' }}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 10,
    padding: 24,
    flexDirection: 'column'
  }
})

export default HomeScreen
