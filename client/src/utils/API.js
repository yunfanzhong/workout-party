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

// Override Fetch API for debugging purposes
async function fetch(...args) {
  console.log('[DEBUG] Performing fetch with arguments:')
  console.log(...args)
  const res = await window.fetch(...args)
  console.log(`[DEBUG] Performed fetch with response code ${res.status}`)
  return res
}

const API = {
  // Untested - comment this out when you test it
  async getUser(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`)
    const user = res.json()
    return user
  },

  // Returns an object with the fields
  // - user: a user object if the request was successful
  // - doesNotExist: bool object specifying if a 404 occurred
  // doesNotExist field lets the login process know that we need to create a
  // new user. (sorry for the bad design)
  async getUserByFacebookID(facebookID) {
    const res = await fetch(`${BASE_URL}/facebook/${facebookID}`)
    if (res.status === 404) {
      return { doesNotExist: true, user: null }
    } else if (!res.ok) {
      throw new Error()
    }
    const user = await res.json()
    return { user, doesNotExist: false }
  },

  // userInfo: { username, displayName, facebookID }
  async createUser(userInfo) {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: { 'Content-Type': 'application/json' }
    })
    const createdUser = await res.json()
    return createdUser
  },

  // Untested - comment this out when you test it
  async logWorkoutToUser(userID, workoutID) {
    await fetch(`${BASE_URL}/users/${userID}`, {
      method: 'POST',
      body: JSON.stringify({ workoutID })
    })
  },

  // Untested - comment this out when you test it
  async addFriendToUser(userID, friendUsername) {
    await fetch(`${BASE_URL}/users/${userID}`, {
      method: 'POST',
      body: JSON.stringify({ username: friendUsername }),
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // Untested - comment this out when you test it
  // updates: { username: optional, displayName: optional }
  async updateUser(userID, updates) {
    const res = await fetch(`${BASE_URL}/users/${userID}`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: { 'Content-Type': 'application/json' }
    })
    const createdUser = res.json()
    return createdUser
  },

  // WORKOUT PARTIES
  async getWorkoutParty(id) {
    const res = await fetch(`${BASE_URL}/workoutParty/${id}`)
    const wp = res.json()
    return wp
  },

  // WORKOUT PARTIES
  async getWorkoutParty(id = '') {
    const res = await fetch(`${BASE_URL}/workoutParty/${id}`)
    const wp = res.json()
    if (wp.error === undefined) {
      return wp
    } else {
      console.log(wp.error)
      return {}
    }
  },

  async createWorkoutParty(wpInfo) {
    const res = await fetch(`${BASE_URL}/workoutParty`, {
      method: 'POST',
      body: JSON.stringify(wpInfo),
      headers: { 'Content-Type': 'application/json' }
    })
    const wp = await res.json()
    return wp
  },

  async addWorkoutToParty(wpID, workoutID) {
    await fetch(`${BASE_URL}/workoutParty/${wpID}`, {
      method: 'POST',
      body: JSON.stringify({ workoutID }),
      headers: { 'Content-Type': 'application/json' }
    })
  },

  async addMemberToParty(wpID, userID) {
    await fetch(`${BASE_URL}/workoutParty/${wpID}/users`, {
      method: 'POST',
      body: JSON.stringify({ userID }),
      headers: { 'Content-Type': 'application/json' }
    })
  },

  async removeMemberFromParty(wpID, id) {
    await fetch(`${BASE_URL}/workoutParty/${wpID}/members`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
  },

  async updateWorkoutParty(wpID, newInfo) {
    await fetch(`${BASE_URL}/workoutParty/${wpID}`, {
      method: 'PATCH',
      body: JSON.stringify(newInfo),
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // WORKOUTS
  async getWorkout(id) {
    const res = await fetch(`${BASE_URL}/workouts/${id}`)
    const workout = res.json()
    return workout
  },

  async createWorkout(workoutInfo) {
    const res = await fetch(`${BASE_URL}/workouts`, {
      method: 'POST',
      body: JSON.stringify(workoutInfo),
      headers: { 'Content-Type': 'application/json' }
    })
    const workout = await res.json()
    return workout
  },

  async updateWorkout(workoutID, newInfo) {
    const res = await fetch(`${BASE_URL}/users/${workoutID}`, {
      method: 'POST',
      body: JSON.stringify(newInfo)
    })
    const newWorkout = res.json()
    return newWorkout
  }
}

export default API
