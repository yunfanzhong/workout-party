import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import API from '../utils/API'
import UserContext from '../context/UserContext'
import Bubble from '../components/Bubble'

function getTimeOfNextOccurrence(day, hour, minute) {
  const time = moment().startOf('isoWeek').day(day).hour(hour).minute(minute)
  const next = time.clone()
  if (next.add(1, 'hour') < moment()) {
    return time.add(1, 'week')
  }
  return time
}

function HomeScreen({ navigation }) {
  return (
    <UserContext.Consumer>
      {(context) => (
        <HomeScreenContent
          workoutHistory={context.user.workoutHistory}
          userID={context.user._id}
          navigation={navigation}
        />
      )}
    </UserContext.Consumer>
  )
}

class HomeScreenContent extends React.Component {
  state = {
    upcomingWorkouts: null
  }

  componentDidMount() {
    const refresh = () => {
      this.setState({ upcomingWorkouts: null })
      API.getUpcomingWorkouts(this.props.userID).then((upcomingWorkouts) => {
        const workouts = upcomingWorkouts.flatMap((workout) =>
          workout.days.map((day) => {
            const time = getTimeOfNextOccurrence(
              day,
              workout.hour,
              workout.minute
            )
            let completed = false
            for (const prevWorkout of this.props.workoutHistory) {
              if (
                prevWorkout.id === workout._id &&
                Math.abs(moment(prevWorkout.time).diff(time)) /
                  (60 * 60 * 1000) <
                  1
              ) {
                completed = true
              }
            }
            return {
              time,
              completed,
              name: workout.name,
              id: workout._id
            }
          })
        )
        workouts.sort((a, b) => a.time.diff(b.time))
        this.setState({
          upcomingWorkouts: workouts.map(({ name, completed, id, time }) => ({
            name,
            id,
            completed,
            time: time.format('ddd, MMM D, YY - h:mm A'),
            key: id + time.format(),
            timeObject: time
          }))
        })
      })
    }
    this.props.navigation.addListener('focus', refresh)
    refresh()
  }

  render() {
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
        {this.state.upcomingWorkouts ? (
          this.state.upcomingWorkouts.length ? (
            <View
              style={{
                height: '100%',
                borderRadius: 8,
                flexShrink: 1
              }}
            >
              <ScrollView>
                {this.state.upcomingWorkouts.map(
                  ({ id, key, name, time, timeObject, completed }) => (
                    <UpcomingListItem
                      completed={completed}
                      id={id}
                      name={name}
                      time={time}
                      key={key}
                      timeObject={timeObject}
                    />
                  )
                )}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{ alignItems: 'center', width: '100%', marginBottom: 8 }}
            >
              <Text style={{ fontSize: 16, color: '#ababab' }}>
                You have no upcoming workouts.
              </Text>
            </View>
          )
        ) : (
          <View style={{ alignItems: 'center', width: '100%', marginTop: 32 }}>
            <ActivityIndicator size="large" color={'#ff2559'} />
          </View>
        )}
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

function UpcomingListItem({ completed, name, id, time, timeObject }) {
  const navigation = useNavigation()

  return (
    <Bubble
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...(completed ? { backgroundColor: '#eafaf1' } : undefined)
      }}
      onPress={
        !completed
          ? () => {
              if (Math.abs(moment().diff(timeObject)) / (1000 * 60 * 60) <= 1) {
                navigation.navigate('Event', {
                  id,
                  partyName: name,
                  time: timeObject.toISOString()
                })
              } else {
                Alert.alert(
                  'Come back later!',
                  `This event isn't happening right now. Please come back within an hour of when this event is happening!`
                )
              }
            }
          : undefined
      }
    >
      <Icon
        name={completed ? 'done' : 'event'}
        size={32}
        color={completed ? 'green' : '#565a5e'}
      />
      <View style={{ flexDirection: 'column', marginLeft: 12 }}>
        <Text
          style={{
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
