// For testing purposes
function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

class API {
  constructor(token) {
    this.token = token
  }

  // Currently all test code
  async getUser(facebookID, throwAnErrorForFun = false) {
    await sleep(Math.random() * 1000)
    if (throwAnErrorForFun) {
      throw new Error('Hi, you told me to throw an error :)')
    }
    return {
      facebookID,
      id: '4',
      username: 'jk.jewik',
      displayName: 'JSON Jewik',
      lastLoggedIn: new Date()
    }
  }
}

export default API
