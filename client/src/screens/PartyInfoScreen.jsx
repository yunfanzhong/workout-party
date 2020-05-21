import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button
} from 'react-native'
import MoreHorizIcon from '../../assets/images/more_horiz-24px.svg'
import React from 'react'

function PartyInfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 300,
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 40
        }}
      >
        Party Info
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Party Settings')}
        style={{ width: 50 }}
      >
        <MoreHorizIcon width={40} height={40} fill="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default PartyInfoScreen
