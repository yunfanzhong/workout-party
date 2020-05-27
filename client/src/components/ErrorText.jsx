import React from 'react'
import { StyleSheet, Text } from 'react-native'

function ErrorText({ children }) {
  return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 8
  }
})

export default ErrorText
