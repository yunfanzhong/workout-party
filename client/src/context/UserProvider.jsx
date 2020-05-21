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
    this.setState({
      user: {
        facebookID: '10923840981234',
        id: '4',
        username: 'jk.jewik',
        displayName: 'JSON Jewik',
        lastLoggedIn: new Date(),
        workoutHistory: [
          { name: 'Legs', id: '10934802384' },
          { name: 'Arms', id: '05829340239' },
          { name: 'Chest', id: '10934802384' },
          { name: 'Legs', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Cardio', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Back', id: '10934802384' },
          { name: 'Legs', id: '10934802384' },
          { name: 'Arms', id: '05829340239' },
          { name: 'Chest', id: '10934802384' },
          { name: 'Legs', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Cardio', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Back', id: '10934802384' },
          { name: 'Legs', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Cardio', id: '10934802384' },
          { name: 'Legs', id: '05829340239' },
          { name: 'Back', id: '10934802384' },
          { name: 'Core', id: '05829340239' }
        ],
        friendsList: [
          { name: 'Ethan Shahbazian', id: '10934802384' },
          { name: 'Yunfan Zhong', id: '05829340239' },
          { name: 'Franklin Zheng', id: '10934802384' },
          { name: 'David A Smallberg (DAS)', id: '10934802384' },
          { name: 'Carey "The Goat" Nachenburg', id: '05829340239' },
          { name: 'Daddy Block', id: '10934802384' },
          { name: 'The Rock Johnson', id: '05829340239' },
          { name: 'Paulus Tamagoman', id: '10934802384' },
          { name: 'Emacs', id: '05829340239' }
        ]
      }
    })
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
