import React from 'react'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import UserContext from '../context/UserContext'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import ListItem from '../components/ListItem.jsx'
import GroupIcon from '../../assets/images/group-24px.svg'

function HeaderText(props) {
  return (
    <Text
      style={{
        color: props.color || 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: props.fontSize,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15
      }}
    >
      {props.text}
    </Text>
  )
}

function QOTDText(props) {
  return (
    <View
      style={{
        flex: 1,
        margin: 15
      }}
    >
      <Text
        style={{
          fontFamily: 'Roboto',
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
          fontSize: 24
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}

function UpcomingListItem(props) {
  const navigation = useNavigation()

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('Event', { partyName: props.partyName })
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
            {props.partyName}
          </Text>
          <Text>{props.eventTime}</Text>
        </View>
      </View>
    </ListItem>
  )
}

function UpcomingList(props) {
  const upcomingList = props.upcomingList
  const list = upcomingList.map((event) => (
    <UpcomingListItem
      key={event.id}
      partyName={event.partyName}
      eventTime={event.time}
    />
  ))
  return <ScrollView>{list}</ScrollView>
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <View style={styles.quote}>
          <QOTDText text="Unfortunately, sitting at your computer 24/7 won't make you any slimmer." />
        </View>
      </View>
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            navigation.navigate('My Parties')
          }
        }}
      >
        <View style={styles.container}>
          <HeaderText fontSize={32} color="black" text="Upcoming" />
          <UpcomingList
            upcomingList={[
              // MOCK DATA
              {
                id: 1,
                partyName: '108 1/7 Revolution',
                time: '9 AM, Tues - May 12, 2020'
              },
              {
                id: 2,
                partyName: 'IOB',
                time: '7 PM, Tues - May 12, 2020'
              },
              {
                id: 3,
                partyName: '108 1/7 Revolution',
                time: '9 AM, Wed - May 13, 2020'
              },
              {
                id: 4,
                partyName: 'IOB',
                time: '7 PM, Wed - May 13, 2020'
              },
              {
                id: 5,
                partyName: '108 1/7 Revolution',
                time: '9 AM, Thurs - May 14, 2020'
              },
              {
                id: 6,
                partyName: 'IOB',
                time: '7 PM, Thurs - May 14, 2020'
              },
              {
                id: 7,
                partyName: '108 1/7 Revolution',
                time: '9 AM, Fri - May 15, 2020'
              },
              {
                id: 8,
                partyName: 'IOB',
                time: '7 PM, Fri - May 15, 2020'
              }
            ]}
          />
        </View>
      </FlingGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 75
  },
  header: {
    flex: 1,
    backgroundColor: '#ff2559',
    justifyContent: 'center'
  },
  quoteContainer: {
    height: 150
  },
  quote: {
    flex: 1,
    backgroundColor: '#f6e8ea',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default HomeScreen
