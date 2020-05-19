import React from 'react'

import logInWithFacebook from '../utils/logInWithFacebook.js'
import UserContext from './UserContext.jsx'

class UserProvider extends React.Component {
  state = {
    user: null
  }

  handleLogin = async () => {
    const { id, token } = await logInWithFacebook()
    console.log(id, token)
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
