import React from 'react'
import { StyleSheet, Text } from 'react-native'

export const H1 = ({ children }) => {
  return <Text style={styles.h1}>{children}</Text>
}

export const H2 = ({ children }) => {
  return <Text style={styles.h2}>{children}</Text>
}

export const H3 = ({ children }) => {
  return <Text style={styles.h3}>{children}</Text>
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    width: '100%'
  },
  h2: {
    fontSize: 30,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },
  h3: {
    marginBottom: 16,
    fontSize: 24,
    textAlign: 'center',
    width: '100%'
  }
})
