import { dbAdmin } from '@firebase/admin/index'
import { cors } from '@helpers/apis/'
import initMiddleware from '@helpers/lib/init-middleware'

const handler = async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method !== 'PUT') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const {
    query: { reservationId, status },
  } = req

  if (req.method === 'PUT') {
    const reservationDetails = {}

    reservationDetails.status = status
    dbAdmin
      .doc(`reservations/${reservationId}`)
      .update(reservationDetails)
      .then(() => {
        return res.json({
          message: `status changed successfully: ${reservationDetails.status}`,
        })
      })
      .catch((err) => {
        return res.status(500).json({ error: err.code })
      })
  }
}

export default handler
