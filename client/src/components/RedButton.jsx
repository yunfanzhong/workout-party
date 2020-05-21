import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const RedButton = (props) => {
  return (
    <View style={{ width: '50%' }}>
      <TouchableOpacity
        style={{
          height: 50,
          marginLeft: '10%',
          marginRight: '5%',
          borderRadius: 20,
          backgroundColor: '#ff2559',
          justifyContent: 'center'
        }}
        onPress={props.onPress}
      >
        <View>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white'
            }}
          >
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default RedButton
