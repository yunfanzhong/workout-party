import React from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

import UserContext from '../context/UserContext'
import Text from '../components/Text'

function LogInScreen() {
  return (
    <View style={styles.screen}>
      <View
        style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          style={styles.logo}
          source={require('../../assets/images/bicep.png')}
        />
        <Text style={styles.homeText}>Workout Party</Text>
      </View>
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
  }

  render() {
    return (
      <UserContext.Consumer>
        {(context) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handlePress(context.login)}
          >
            <Icon
              name="sc-facebook"
              size={48}
              color="#1778F2"
              style={{ marginLeft: 12 }}
            />
            {this.state.isLoading ? (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#ff2559" />
              </View>
            ) : (
              <Text style={styles.fbButtonText}>Get started with Facebook</Text>
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
    alignContent: 'center',
    paddingVertical: 48
  },
  logo: {
    alignContent: 'center',
    width: Math.round(Dimensions.get('window').width * 0.45),
    height: Math.round(Dimensions.get('window').width * 0.6)
  },
  button: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 70,
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 4
  },
  homeText: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    marginTop: 32,
    fontWeight: 'bold'
  },
  fbButtonText: {
    fontSize: 18,
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
