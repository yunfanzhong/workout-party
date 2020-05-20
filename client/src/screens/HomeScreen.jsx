import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import UserContext from '../context/UserContext'

const HeaderText = (props) => {
  return (
    <Text
      style={{
        color: props.color || 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: props.fontSize,
        fontWeight: 'bold',
        paddingTop: props.paddingTop || 0
      }}
    >
      {props.text}
    </Text>
  )
}

const QOTDText = (props) => {
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

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <View style={styles.quote}>
          <QOTDText text="Unfortunately, sitting at your computer 24/7 won't make you any slimmer." />
        </View>
      </View>

      <View>
        <HeaderText
          fontSize={32}
          color="black"
          paddingTop={15}
          text="Upcoming"
        />
      </View>
      {/* test code below */}
      <UserContext.Consumer>
        {(context) => (
          <Button
            title="This is for testing logout, feel free to remove me"
            onPress={context.logout}
          ></Button>
        )}
      </UserContext.Consumer>
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
