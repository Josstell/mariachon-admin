import InputLabel from '@material-ui/core/InputLabel'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Divider from '@material-ui/core/Divider'

import { TextField } from '@material-ui/core'

const PaymentData = ({
  classes,
  reservation,
  hanldleChangeReservation,
  paymentPos,
  payment,
  price,
  setPrice,
  mariachiService,
}) => {
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Divider className={classes.dividerSpace} />
      <InputLabel>Pago</InputLabel>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Servicio</InputLabel>
          <Select
            id="service"
            name="service"
            value={reservation.service}
            onChange={hanldleChangeReservation}
          >
            {mariachiService &&
              mariachiService.map((ser, index) => (
                <option key={index} value={ser}>
                  {ser}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Cantidad"
            type="number"
            name="qty"
            placeholder="Precio del servicio"
            value={reservation?.qty}
            onChange={hanldleChangeReservation}
          />
        </FormControl>
      </div>

      <FormControl className={classes.formControl}>
        <InputLabel>Tipo de pago: </InputLabel>
        <Select
          id="payment"
          name="payment"
          value={reservation.payment}
          onChange={hanldleChangeReservation}
        >
          {paymentPos &&
            paymentPos.map((pos, index) => (
              <option key={index} value={payment[pos]}>
                {payment[pos]}
              </option>
            ))}
        </Select>
      </FormControl>
      <div>
        <FormControl className={classes.formControl}>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Precio Sugerido"
            type="number"
            name="price"
            value={price}
            disabled
          />
          {/* <Select
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            {mariachiService &&
              mariachiService.map((price, index) => (
                <option key={index} value={mariachiData?.service_price[price]}>
                  {mariachiData?.service_price[price]}
                </option>
              ))}
          </Select> */}
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Cambiar precio"
            type="number"
            name="price"
            placeholder="Precio del servicio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
      </div>

      <FormControl className={classes.formControl}>
        <TextField
          id="filled-basic"
          variant="filled"
          label="Deposito"
          name="deposit"
          placeholder="Anticipo"
          value={reservation.deposit}
          onChange={hanldleChangeReservation}
        />
      </FormControl>
      {/* <FormControl className={classes.formControl}>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Resta a pagar"
            name="resta"
            value={price - reservation.deposit}
            disabled
          />
        </FormControl> */}
    </form>
  )
}

export default PaymentData
