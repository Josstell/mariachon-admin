import { AdminAuth, dbAdmin } from '@firebase/admin/index'
import { cors } from '@helpers/apis/'
import initMiddleware from '@helpers/lib/init-middleware'

export const authMiddleware = (fn) => async (req, res) => {
  await initMiddleware(req, res, cors)

  let idToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  AdminAuth.verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken
      return dbAdmin
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(async (data) => {
      req.user.userName = data.docs[0].data().userName
      req.user.imageUrl = data.docs[0].data().imageUrl
      req.user.role = data.docs[0].data().role
      req.user.userId = data.docs[0].data().userId
      req.user.fullName = data.docs[0].data().fullName
      req.user.phone = data.docs[0].data().phone
      req.user.address = data.docs[0].data().address
      req.user.token = idToken
      return await fn(req, res)
    })
    .catch((err) => {
      console.error('Error while verifying token', err)
      return res.status(403).json(err.message)
    })
}
