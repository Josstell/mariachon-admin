import { auth } from '@firebase/index'

import { isEmpty, isEmail } from '@helpers/apis'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  const errors = {}
  if (isEmpty(user.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(user.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(user.password)) {
    errors.password = 'Must not be empty'
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  if (req.method === 'POST') {
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => data.user.getIdToken(true))
      .then((token) => res.json({ token }))
      .catch((err) => res.status(403).json({ general: err.message }))
  }
}

export default handler
