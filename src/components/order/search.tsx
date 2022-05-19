import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Order, State } from '../../context/type'
import { AdminsContext } from "../../context/adminContext"
import 
  { Grid, 
    Paper,
    FormControl, 
    FormLabel, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    ButtonGroup, 
    Button } from '@mui/material'
import { reducer } from '../../context/adminContext'

export const Search = () => {
    const context = React.useContext(AdminsContext)
    const [state, dispatch] = React.useReducer(reducer, context)
    const orderList = getOrderList(context) 
    const [orderName, setOrderName] =  React.useState<string>("")
    let activeOrder = getOrder(orderName, context)
    const [name, setName] = React.useState<string | null>("")
    const [date, setDate] = React.useState<string | null>("")
    const [address, setAddress] = React.useState<string | null>("")
    const [saleAmount, setSaleAmount] = React.useState<string | null>("")
    const [paymentMethod, setPaymentMothod] = React.useState<string | null>("")
    const [cardNum, setCardNum] = React.useState<string | null>("")
    const handleOrder = () => {
      dispatch({type : "updateOrder", 
      payload: {
        id: activeOrder.id,
        name: name, 
        address: address, 
        date: date, 
        saleAmount: saleAmount, 
        paymentMethod: paymentMethod, 
        cardNum: cardNum
      }})
      alert("Updated!!")
    }
    const removeOrder = () => {
      alert("Complete removing!")
      dispatch({type: "removeOrder", payload: {id: activeOrder.id}})
    }
    return (
      <>
        <Autocomplete
          disablePortal
          options={orderList}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Order" />}
          fullWidth
          value={orderName}
          onChange={(event: any, newValue: string) => {
            activeOrder = getOrder(newValue, context)
            setOrderName(newValue)
            setName(activeOrder.name)
            setDate(activeOrder.date)
            setAddress(activeOrder.address)
            setCardNum(activeOrder.cardNum)
            setPaymentMothod(activeOrder.cardType)
            setSaleAmount(activeOrder.saleAmount)
            }}
          />
          <Grid item xs={12} md={12} lg={12} mt={'20px'}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 600,
            }}
            >
              <TextField margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange = {(e : any) => setName(e.target.value)}
              />
              <TextField margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                autoComplete="date"
                autoFocus
                value={date}
                onChange={(e:any) => setDate(e.target.value)} 
              />
              <TextField margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                value={address}
                onChange={(e:any) => setAddress(e.target.value)} 
              />
              <TextField margin="normal"
                required
                fullWidth
                id="sale-amount"
                label="Sale Amount"
                name="sale-amount"
                autoComplete="sale-amount"
                autoFocus
                value={saleAmount}
                onChange={(e:any) => setSaleAmount(e.target.value)}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Payment Method</FormLabel>
                <RadioGroup
                  row
                  name="card-type"
                  id="card-type"
                  value={paymentMethod}
                  onChange={(e:any) => {
                    setPaymentMothod(e.target.value)}
                  } 
                >
                  <FormControlLabel value="visa" control={<Radio />} label="VISA" />
                  <FormControlLabel value="mc" control={<Radio />} label="MC" />
                  <FormControlLabel value="amec" control={<Radio />} label="AMEC" />
                </RadioGroup>
              </FormControl>
              <TextField margin="normal"
                required
                fullWidth
                id="card-num"
                label="Card Number"
                name="card-num"
                autoComplete="card-num"
                autoFocus
                value={cardNum}
                onChange={(e:any) => setCardNum(e.target.value)} 
              />
              <ButtonGroup>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}
                  onClick={handleOrder}
                >
                  Save
                </Button>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}
                  onClick={removeOrder}
                >
                  Delete
                </Button>
              </ButtonGroup>
          </Paper>
        </Grid>
      </>
    )
}

function getOrderList (context: State) {
  const activeAdmin = context?.admins.find(admin => admin.isLogIn)
  let orderList : any[]
  if (activeAdmin) {
    orderList = activeAdmin.orders.map(order => order.name)
  } else {
    orderList = []
  }
  return orderList
}
const getOrder = (name: string, context: State) => {
  const newOrder: Order = {
    id : '',
    name: '',
    date: '',
    address: '',
    cardType: "VISA",
    cardNum: '',
    saleAmount: ''
  }
  let activeOrder
  context.admins.forEach(admin => {
    if (admin.isLogIn) {
      activeOrder = admin.orders.find(order => order.name === name)
    }
  })
  if (activeOrder) {
    return activeOrder
  }
  return newOrder
}
