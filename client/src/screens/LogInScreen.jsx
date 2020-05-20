import React from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import UserContext from '../context/UserContext'

function LogInScreen() {
  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/bicep.png')}
      />
      <Text style={styles.homeText}>Workout{'\n'}Party</Text>
      <LoginButton />
    </View>
  )
}

class LoginButton extends React.Component {
  state = {
    isLoading: false
  }

  handlePress = async (login) => {
    // Perform a setState and login. Promise.all allows us to wait for both to
    // finish.
    await Promise.all([
      new Promise((resolve) => this.setState({ isLoading: true }, resolve)),
      login()
    ])
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <UserContext.Consumer>
        {(context) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handlePress(context.login)}
          >
            <Image
              style={styles.fbLogo}
              source={require('../../assets/images/f_logo_RGB-Hex-Blue_512.png')}
            />
            {this.state.isLoading ? (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#ff2559" />
              </View>
            ) : (
              <Text style={styles.fbButtonText}>Get Started with Facebook</Text>
            )}
          </TouchableOpacity>
        )}
      </UserContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ff2559',
    alignContent: 'center'
  },
  logo: { alignContent: 'center', width: 400, height: 400 },
  button: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 70,
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 20
  },
  homeText: {
    fontSize: 64,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10
  },
  fbButtonText: {
    fontSize: 19,
    color: '#22181c',
    marginLeft: 12
  },
  fbLogo: {
    height: 44,
    width: 44,
    marginTop: 1.2,
    marginLeft: 15
  },
  spinner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 44
  }
})

export default LogInScreen
