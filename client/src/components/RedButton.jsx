import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const RedButton = ({ onPress, text, center }) => {
  const buttonStyles = {
    ...styles.button,
    ...{ alignSelf: center ? 'center' : undefined }
  }
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
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
