import React from 'react'
import { ActivityIndicator, View } from 'react-native'

function FullPageSpinner() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator size="large" color={'#ff2559'} />
    </View>
  )
}

export default FullPageSpinner
