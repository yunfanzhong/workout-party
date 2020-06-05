import React from 'react'
import { Text } from 'react-native'

function CustomText({ style, ...props }) {
  let fontWeight
  if (style) {
    fontWeight = style.fontWeight
    delete style.fontWeight
  }
  return (
    <Text
      style={{
        ...style,
        fontFamily: `source-sans-pro-${
          fontWeight === 'bold' ? 'semibold' : 'regular'
        }`
      }}
      {...props}
    />
  )
}

export default CustomText
