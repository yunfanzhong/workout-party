import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import API from '../utils/API'
import UserContext from '../context/UserContext'
import Bubble from '../components/Bubble'
import FullPageSpinner from '../components/FullPageSpinner'

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
      return <FullPageSpinner />
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
            {this.state.upcomingWorkouts.map(({ id, key, name, time }) => (
              <UpcomingListItem id={id} name={name} time={time} key={key} />
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

function QuoteText({ children }) {
  return (
    <Bubble
      style={{
        backgroundColor: '#ffe9ee',
        borderColor: '#ff2559',
        elevation: 8
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
    </Bubble>
  )
}

function UpcomingListItem({ name, id, time }) {
  const navigation = useNavigation()

  return (
    <Bubble
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={() => {
        navigation.navigate('Event', {
          id,
          partyName: name
        })
      }}
    >
      <Icon name="event" size={32} color="#565a5e" />
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
    </Bubble>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 18,
    flexDirection: 'column'
  }
})

export default HomeScreen
