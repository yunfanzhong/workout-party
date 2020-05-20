import Constants from 'expo-constants'
const { manifest } = Constants

// SEEMS TO ONLY WORK IF YOU SERVE THE APP OVER LAN
// https://stackoverflow.com/a/49198103/8624603
const BASE_URL =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? 'http://' + manifest.debuggerHost.split(`:`).shift().concat(':3000')
    : `api.example.com`

// For testing purposes
function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const API = {
  // Currently all test code
  async getUser(facebookID) {
    const res = await fetch(`${BASE_URL}/users/${facebookID}`, {
      headers: this.headers
    })
    const user = await res.json()
    return user
  }
}

export default API
