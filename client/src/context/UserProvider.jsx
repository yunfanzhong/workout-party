import React from 'react'
import { Text } from 'react-native'

import logInWithFacebook from '../utils/logInWithFacebook.js'
import UserContext from './UserContext.jsx'
import API from '../utils/API.js'
import BlankModal from '../components/BlankModal'
import { H3 } from '../components/Header'
import ErrorText from '../components/ErrorText'
import RedButton from '../components/RedButton'
import FormInput from '../components/FormInput.jsx'

class UserProvider extends React.Component {
  state = {
    user: null,
    modalVisible: false,
    facebookID: null // Used for temporary storage when creating an account
  }

  handleLogin = async () => {
    this.setState({
      user: {
        workoutParties: [],
        workoutHistory: [],
        friends: [
          {
            _id: '5ec5d64145eb3268f78093f2',
            username: 'jordano'
          },
          {
            _id: '5ec74ae1c79d324cecbb55b6',
            username: 'jk.jewik'
          }
        ],
        _id: '5ecef59120368361f45eba00',
        username: 'ilikesocks',
        displayName: 'John Doe',
        facebookID: '2679680868944918',
        lastLoggedIn: '2020-05-27T23:19:45.439Z',
        __v: 2
      }
    })
  }

  // Update the locally stored user object.
  // Usage: context.updateUser({ friends: [] })
  //        ^ This clears the user's friends list (LOCALLY)
  updateUser = (updates) => {
    const user = { ...this.state.user, ...updates }
    this.setState({ user })
  }

  handleLogout = async () => {
    this.setState({ user: null })
  }

  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible })
  }

  render() {
    const contextValue = {
      login: this.handleLogin,
      logout: this.handleLogout,
      update: this.updateUser,
      user: this.state.user
    }

    return (
      <UserContext.Provider value={contextValue}>
        <UserSignupModal
          visible={this.state.modalVisible}
          setVisible={this.setModalVisible}
          facebookID={this.state.facebookID}
          onSubmit={(user) => this.setState({ user, modalVisible: false })}
        />
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

class UserSignupModal extends React.Component {
  state = {
    username: '',
    displayName: '',
    error: null
  }

  handleChangeText = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  submitForm = async () => {
    const { username, displayName } = this.state

    // Validate form
    if (
      username.includes(' ') ||
      username.length === 0 ||
      username.length > 20
    ) {
      this.setState({ error: 'Invalid display name.' })
      return
    } else if (displayName.length === 0 || displayName.length > 40) {
      this.setState({ error: 'Invalid username.' })
      return
    }

    // Submit form
    try {
      const user = await API.createUser({
        username,
        displayName,
        facebookID: this.props.facebookID
      })
      this.props.onSubmit(user)
    } catch (err) {
      this.setState({ error: 'Error creating an account :(' })
    }
  }

  render() {
    const { visible, setVisible } = this.props
    return (
      <BlankModal visible={visible} setVisible={setVisible}>
        <H3>Sign Up</H3>
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        <Text>Username</Text>
        <FormInput
          placeholder="i.e. ilikesocks123"
          value={this.state.username}
          onChangeText={(value) => this.handleChangeText('username', value)}
        />
        <Text>Actual Name</Text>
        <FormInput
          placeholder="i.e. John Doe"
          value={this.state.displayName}
          onChangeText={(value) => this.handleChangeText('displayName', value)}
        />
        <RedButton text="Submit" onPress={this.submitForm} center={true} />
      </BlankModal>
    )
  }
}

export default UserProvider
