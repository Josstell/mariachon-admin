import { cors, getDataMariachis } from '@helpers/apis/'
import initMiddleware from '@helpers/lib/init-middleware'

/* const severalMariachis = (mariachis) => {
  const dataUser = [];
  try {
    mariachis.forEach((item) => {
      const data = getDataCoordinator(item.coordinatorData);
      dataUser.push(data);
    });
    return dataUser;
  } catch (error) {
    console.log(error);
  }
}; */

export default async (req, res) => {
  await initMiddleware(req, res, cors)

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    try {
      const mariachis = await getDataMariachis()
      // const dataUser = await severalMariachis(mariachis)
      // console.log(dataUser);
      return res.status(201).json(mariachis)
    } catch (err) {
      return res.status(500).json({ error: err.code })
    }
  }
}
