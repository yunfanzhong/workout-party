import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

function FormInput({ style, ...props }) {
  return <TextInput style={{ ...styles.input, ...style }} {...props} />
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#ededed',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 8,
    width: '100%'
  }
})

export default FormInput
