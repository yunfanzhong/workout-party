import React from 'react'
import { StyleSheet } from 'react-native'
import Text from '../components/Text'

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
