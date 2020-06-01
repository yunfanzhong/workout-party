import React from 'react'
import { StyleSheet, Text } from 'react-native'

function FormLabel({ style, children }) {
  return <Text style={{ ...styles.formLabel, ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6
  }
})

export default FormLabel
