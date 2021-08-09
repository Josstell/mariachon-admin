const admin = require('firebase-admin')
const { firebaseConfig } = require('@firebase/index')

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_GOOGLE
)

try {
  !admin.apps.length &&
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: firebaseConfig.storageBucket,
    })
} catch (error) {
  console.log(error)
}

export const AdminAuth = admin.auth()
export const dbAdmin = admin.firestore()
export const storage = admin.storage()
