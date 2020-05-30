import React from 'react'
import { View, Picker, StyleSheet } from 'react-native'

function FormPicker({ children, ...props }) {
  return (
    <View style={styles.picker}>
      <Picker {...props}>{children}</Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'white',
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingLeft: 4
  }
})

export default FormPicker
