import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

function Bubble({ children, style, onPress }) {
  const bubbleContent = (
    <View
      style={{
        ...styles.bubble,
        ...style
      }}
    >
      {children}
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>{bubbleContent}</TouchableOpacity>
    )
  }
  return bubbleContent
}

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { height: 24 }
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Bubble
