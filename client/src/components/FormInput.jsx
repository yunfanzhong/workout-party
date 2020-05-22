import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

function FormInput(props) {
  return <TextInput style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#eaecee',
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 16,
    borderRadius: 12,
    width: '100%'
  }
})

export default FormInput
