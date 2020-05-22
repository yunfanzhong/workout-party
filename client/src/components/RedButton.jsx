import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const RedButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    backgroundColor: '#ff2559',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
})

export default RedButton
