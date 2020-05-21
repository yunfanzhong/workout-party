import * as Facebook from 'expo-facebook'
import { facebookAppID } from '../../env.json'

async function logInWithFacebook() {
  console.log('[DEBUG] Logging in with Facebook...')
  await Facebook.initializeAsync(facebookAppID)
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile']
  })
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    )
    const data = await response.json()
    console.log('[DEBUG] Success logging in with Facebook!')
    return { ...data, token }
  }
  throw new Error('Error logging in with Facebook.')
}

export default logInWithFacebook
