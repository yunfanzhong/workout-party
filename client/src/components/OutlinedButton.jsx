import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const OutlinedButton = ({
  onPress,
  text,
  center,
  icon,
  style,
  elevation = 0
}) => {
  const buttonStyles = {
    ...styles.button,
    ...{ alignSelf: center ? 'center' : undefined, elevation },
    ...style
  }
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      {icon && (
        <Icon
          style={{ marginLeft: -8, marginRight: 4 }}
          name={icon}
          size={24}
          color="#ff2559"
        />
      )}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderColor: '#ff2559',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 12 },
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }
})

export default OutlinedButton
