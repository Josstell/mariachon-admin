// const GoogleSpreadsheet = require('google-spreadsheet/lib/GoogleSpreadsheet')

// const creds = require('../../../mariachonpage-044f0d8de3b2.json')

// const credsEnv = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_SHEET)

// const credsEnvENV2 = process.env.NEXT_PUBLIC_GOOGLE_SHEET_PREVIEW

// const creds = {
//   ...credsEnv,
//   ...credsEnvENV2,
// }

// const creds = process.env.NEXT_PUBLIC_GOOGLE_SHEET
// const SPREADSHEET_ID = process.env.SPREADSHEET_ID
// const SHEET_ID = process.env.SHEET_ID

export const getClientData = (userId, allUsers) => {
  const userData = allUsers.find((user) => user.userId === userId)
  return {
    clientId: userData.userId,
    nameClient: userData.fullName,
    phone: userData.phone,
    email: userData.email,
    userName: userData.userName,
    imageUrl: userData.imageUrl,
    instrument: userData.instrument,
    state: userData.state,
  }
}

export const getMariachiData = (mariachiId, allMariachis) => {
  const mariachiData = allMariachis.find(
    (mariachi) => mariachi.mariachiId === mariachiId
  )
  return {
    mariachiId: mariachiData.mariachiId,
    nameMariachi: mariachiData.name,
    coordinator: mariachiData.coordinatorData,
    imageLogo: mariachiData.imageLogo,
  }
}

/*******************************************************************
 creating WhatsApp
********************************************************************/

export const createUrlWhatsApp = async (reservationData) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const mariahiCoordinatorPhone = '52' + reservationData.coordinatorData.phone
  const date = new Date(reservationData.date)
  const remainder = reservationData.price - reservationData.deposit
  const pagado = remainder === 0 ? ' *PAGADO*' : '$ ' + remainder
  const sl = '%0A' // new line

  const addressNorm = reservationData.address.replace('#', '%23')

  // https://api.whatsapp.com/send?phone=

  let listSongs = []

  reservationData.playlist.forEach((song) => listSongs.push(`${sl}${song} `))

  listSongs =
    reservationData.playlist.length > 0
      ? '*Lista de canciones:* ' + listSongs + sl
      : ''

  const url =
    'https://wa.me/' +
    mariahiCoordinatorPhone +
    '?text=*Reserva:* ' +
    reservationData.reservationId +
    sl +
    '*Nombre:* ' +
    reservationData.client.nameClient +
    sl +
    '*Fecha:* ' +
    date.toLocaleDateString('es-MX', options) +
    sl +
    '*Hora:* ' +
    date.toLocaleTimeString() +
    sl +
    '*Dirección:* ' +
    addressNorm +
    sl +
    '*Teléfono:* ' +
    reservationData.client.phone +
    sl +
    '*Mariachi:* ' +
    reservationData.mariachiData.nameMariachi +
    sl +
    '*Servicio:* ' +
    reservationData.service +
    sl +
    '*Precio:* $' +
    reservationData.price +
    sl +
    '*Deposito:* $' +
    reservationData.deposit +
    sl +
    '*Resta a pagar:* ' +
    pagado +
    sl +
    '*Mensaje:* ' +
    reservationData.message +
    sl +
    listSongs +
    '*Ubicación:* '

  window.open(await url, '_blank')

  return await url
}

/************************************************************************************************
 *
 * Google Sheet
 */

// export const callApiGoogleSheet = async () => {
//   const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

//   await doc.useServiceAccountAuth(creds)
//   await doc.loadInfo()
//   const sheet = doc.sheetsById[SHEET_ID]
//   const sheetGoogle = await sheet.getRows()
//   return { sheetGoogle, sheet }
// }
