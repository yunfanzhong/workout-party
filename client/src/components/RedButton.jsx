import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const RedButton = ({
  onPress,
  text,
  style,
  center,
  textAlign = 'center',
  elevation = 0
}) => {
  const buttonStyles = {
    ...styles.button,
    ...{ alignSelf: center ? 'center' : undefined, elevation },
    ...style
  }
  const textStyles = {
    ...styles.buttonText,
    ...{ textAlign: textAlign }
  }
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: '#ff2559',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 12 }
  },
  buttonText: {
    fontSize: 16,
    color: 'white'
  }
})

export default RedButton
