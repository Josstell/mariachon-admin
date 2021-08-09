import { auth } from '@firebase/index'

export const signInWithGoogle = () => {
  const googleProvider = new auth.GoogleAuthProvider()
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log('google sign in', result)
    })
    .catch((err) => {
      console.log(err)
    })
}
