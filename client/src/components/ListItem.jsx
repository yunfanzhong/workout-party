import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Text from '../components/Text'

const ListItem = (props) => {
  return (
    <View
      style={{
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        paddingTop: '2%',
        paddingBottom: '2%',
        borderTopColor: '#b4b4b4',
        borderTopWidth: 2
      }}
    >
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'transparent',
          justifyContent: 'center'
        }}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  )
}

export default ListItem
