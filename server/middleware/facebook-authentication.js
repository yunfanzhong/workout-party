const axios = require('axios')

let accessToken = null

// Following the procedure specified here: https://stackoverflow.com/a/16092226/8624603
async function authenticateFacebookToken(req, res, next) {
  const inputToken = req.headers.authorization

  // Get an "app access token"
  if (accessToken === null) {
    const accessTokenResponse = await axios.get(
      'https://graph.facebook.com/oauth/access_token',
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          grant_type: 'client_credentials'
        }
      }
    )
    accessToken = accessTokenResponse.data.access_token
  }

  // Verify the input token
  try {
    const authResponse = await axios.get(
      'https://graph.facebook.com/debug_token',
      {
        params: { input_token: inputToken, access_token: accessToken }
      }
    )
    if (authResponse.data.data.is_valid) {
      next()
    } else {
      throw new Error()
    }
  } catch (err) {
    res.status(401).send({ error: 'Invalid access token' }) // 401 = Unauthorized
  }
}

module.exports = authenticateFacebookToken
