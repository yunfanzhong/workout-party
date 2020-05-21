import React from 'react'
import { Alert } from 'react-native'

import logInWithFacebook from '../utils/logInWithFacebook.js'
import UserContext from './UserContext.jsx'
import API from '../utils/API.js'

class UserProvider extends React.Component {
  state = {
    user: null
  }

  // handleLogin = async () => {
  //   const { id: facebookID } = await logInWithFacebook()
  //   try {
  //     const user = await API.getUser(facebookID)
  //     this.setState({ user })
  //   } catch (err) {
  //     Alert.alert('uwu', 'oopsies! we had a pwobwem wogging you in. 😔')
  //   }
  // }

  handleLogin = async () => {
    const { id: facebookID } = await logInWithFacebook()
    try {
      const { user, doesNotExist } = await API.getUserByFacebookID(facebookID)
      if (doesNotExist) {
        // TODO, pop up a modal for a user to enter their username and display name
        Alert.alert(
          'owo',
          "wooks wike you don't have an account yet! we haven't impwemented that featuwe yet sowwy!"
        )
      } else {
        this.setState({ user })
      }
    } catch (err) {
      Alert.alert('uwu', 'oopsies! we had a pwobwem wogging you in. 😔')
    }
  }

  handleLogout = async () => {
    this.setState({ user: null })
  }

  render() {
    const contextValue = {
      login: this.handleLogin,
      logout: this.handleLogout,
      user: this.state.user
    }

    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
