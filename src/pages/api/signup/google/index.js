import { auth, googleProvider } from '@firebase/index'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'POST') {
    await auth
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        const credential = result.credential

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        return await res.status(201).json({ token, user })
        // ...
      })
      .catch(async (error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        // ...
        return await res
          .status(500)
          .json({ errorCode, errorMessage, email, credential })
      })
  }
}

export default handler
