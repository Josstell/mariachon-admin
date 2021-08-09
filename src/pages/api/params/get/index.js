import { dbAdmin } from '@firebase/admin/index'
import { cors } from '@helpers/apis/'

import initMiddleware from '@helpers/lib/init-middleware'

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { role },
  } = req

  if (req.method === 'GET' && role === 'admin') {
    dbAdmin
      .collection('params')
      .get()
      .then((snap) => {
        const { payment } = snap.docs[0].data()
        const userTypes = snap.docs[0].data().userPermits
        const { instruments } = snap.docs[0].data()
        const { services } = snap.docs[0].data()
        const { status } = snap.docs[0].data()

        const params = {
          payment,
          userTypes,
          instruments,
          services,
          status,
        }
        return res.status(201).json(params)
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: 'Something went wrong', error: err.message })
      })
  } else {
    res
      .status(400)
      .json({ message: "You don't have permission to get these data" })
  }
}

export default handler
