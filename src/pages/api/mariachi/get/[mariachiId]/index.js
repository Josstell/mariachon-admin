import { dbAdmin } from '@firebase/admin/index'
import { cors } from '@helpers/apis/'
import initMiddleware from '@helpers/lib/init-middleware'

export default async (req, res) => {
  await initMiddleware(req, res, cors)

  const {
    query: { mariachiId },
  } = req

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    const mariachiData = {}
    mariachiData.reservationsDetails = []

    dbAdmin
      .doc(`/mariachis/${mariachiId}`)
      .get()
      .then((doc) => {
        mariachiData.mariachiDetails = doc.data()
        return dbAdmin
          .collection('users/')
          .where('userId', '==', mariachiData.mariachiDetails.coordinatorId)
          .get()
      })
      .then((docs) => {
        docs.forEach((doc) => {
          mariachiData.coordinatorDetails = doc.data()
        })
        return dbAdmin
          .collection('reservations/')
          .where('mariachiId', '==', mariachiId)
          .get()
      })
      .then((docs) => {
        docs.forEach((doc) => {
          mariachiData.reservationsDetails.push(doc.data())
        })
        return res.json(mariachiData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
