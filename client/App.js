import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        {
          <LinearGradient
            colors={['transparent', '#rgb(255, 103, 151)']} // pink gradient
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}
            start={{x: 0.0, y: 0.2}}
            end={{x: 0.5, y: 1.0}}
          />
        }
        <LinearGradient
          colors={['transparent', '#b565f0']} // purple gradient
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
          start={{x: 0.0, y: 0.1}}
          end={{x: -0.8, y: 0.6}}
        />
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: 'transparent',
            color: '#1d4060',
            textShadowColor: 'white',
            textShadowRadius: 30,
            fontFamily: 'PermanentMarker-Regular',
            fontSize: 72,
            width: '100%',
          }}>
          Workout{'\n'}Party
        </Text>
      </View>
    );
  }
}
