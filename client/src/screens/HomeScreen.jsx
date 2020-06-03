import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const parties = [
  // MOCK DATA
  {
    id: 1,
    name: '108 1/7 Revolution',
    time: '9 AM, Tues - May 12, 2020'
  },
  {
    id: 2,
    name: 'IOB',
    time: '7 PM, Tues - May 12, 2020'
  },
  {
    id: 3,
    name: '108 1/7 Revolution',
    time: '9 AM, Wed - May 13, 2020'
  },
  {
    id: 4,
    name: 'IOB',
    time: '7 PM, Wed - May 13, 2020'
  },
  {
    id: 5,
    name: '108 1/7 Revolution',
    time: '9 AM, Thurs - May 14, 2020'
  },
  {
    id: 6,
    name: 'IOB',
    time: '7 PM, Thurs - May 14, 2020'
  },
  {
    id: 7,
    name: '108 1/7 Revolution',
    time: '9 AM, Fri - May 15, 2020'
  },
  {
    id: 8,
    name: 'IOB',
    time: '7 PM, Thurs - May 14, 2020'
  },
  {
    id: 9,
    name: '108 1/7 Revolution',
    time: '9 AM, Fri - May 15, 2020'
  },
  {
    id: 10,
    name: 'IOB',
    time: '7 PM, Fri - May 15, 2020'
  },
  {
    id: 93,
    name: '108 1/7 Revolution',
    time: '9 AM, Fri - May 15, 2020'
  },
  {
    id: 103,
    name: 'IOB',
    time: '7 PM, Fri - May 15, 2020'
  }
]

class HomeScreen {
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
        <View
          style={{
            height: '100%',
            borderRadius: 8,
            flexShrink: 1
          }}
        >
          <ScrollView>
            {parties.map(({ id, name, time }) => (
              <UpcomingListItem name={name} time={time} key={id} />
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
