import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const fireEnv = process.env.NEXT_PUBLIC_FIREBASE_CONFIG

// const fireEnv2 = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_PRODUCTION

const firebaseConfig = JSON.parse(fireEnv)

// const fireAdminENV1 = JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_GOOGLE)

// const fireAdminENV2 = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_GOOGLE_PREVIEW

// const FIRE = {
//   ...fireAdminENV1,
//   ...fireAdminENV2,
// }

// const firebaseConfig2 = JSON.stringify(firebaseConfig)
// console.log(JSON.parse(firebaseConfig2))

// const ServiceGoogle = JSON.parse(serviceGoogleEnv)
// console.log("Aqui!!   ",firebaseConfig);
// console.log("Google!!   ",ServiceGoogle);
// const serviceAccount = require("../../mariachonauth.json")

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

// !admin.apps.length &&
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: firebaseConfig.storageBucket,
//   })

//   const AdminAuth = admin.auth()
//   const dbAdmin = admin.firestore()
//   const storage = admin.storage()

const db = firebase.firestore()
const auth = firebase.auth()

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}

// export const signInWithGoogle = () => {
//    const googleProvider =   new firebase.auth.GoogleAuthProvider()
//     auth.signInWithPopup(googleProvider)
//        .then((result)=>{

//           console.log('google sign in', result)
//         })
//         .catch((err)=>{
//           console.log("error:",err);
//         })
//  }

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const getDataUserProvider = (user, additionalUserInfo, credential) => {
  const { uid, photoURL, email, phoneNumber, displayName } = user

  const {
    // eslint-disable-next-line camelcase
    profile: { given_name, first_name },
  } = additionalUserInfo

  return {
    userId: uid,
    fullName: displayName,
    // eslint-disable-next-line camelcase
    userName: given_name || first_name,
    email: email,
    imageUrl: photoURL,
    phone: phoneNumber,
    providerId: credential.providerId,
  }
}

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        const credential = result.credential

        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = credential.accessToken

        const token = result.user.getIdToken()

        // The signed-in user info.
        const user = getDataUserProvider(
          result.user,
          result.additionalUserInfo,
          credential
        )

        resolve({ token, user })
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
        console.log({ errorCode, errorMessage, email, credential })
        // ...
        reject(new Error({ errorCode, errorMessage, email, credential }))
      })
  })
}

export const signInWithFacebook = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(async (result) => {
        const credential = result.credential

        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = credential.accessToken

        const token = result.user.getIdToken()

        // The signed-in user info.
        const user = getDataUserProvider(
          result.user,
          result.additionalUserInfo,
          credential
        )

        // user.imageUrl = result.additionalUserInfo.profile.picture.data.url

        resolve({ token, user })
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
        reject(new Error({ errorCode, errorMessage, email, credential }))
      })
  })
}

export { db, auth, firebaseConfig, googleProvider, facebookProvider }
