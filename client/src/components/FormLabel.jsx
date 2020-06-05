import React from 'react'
import { StyleSheet } from 'react-native'
import Text from '../components/Text'

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
