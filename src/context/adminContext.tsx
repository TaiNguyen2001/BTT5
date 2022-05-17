import { createContext, useReducer } from "react"
import { State, Actions, Admin, Order, } from './type'

const intialState: State = {
  admins: []
}

export const reducer = function(state: State, action: Actions) {
  switch (action.type) {
    case 'addAdmin': {
      const newAdmin : Admin = {
        id : Math.random().toString(16),
        userName : action.payload.userName,
        password : action.payload.password,
        isLogIn: false,
        orders: []
      }
      const newState = {
        ...state,
        admins: [...state.admins, newAdmin]
      }
      localStorage.setItem('state', JSON.stringify(newState))
      return newState
    }
    case 'addOrder': {
      let newOrders: Order[]
      let updatedAdmins: Admin[]
      const order : Order = {
        date: action.payload.date,
        name: action.payload.name,
        address: action.payload.address,
        cardType: action.payload.cardType,
        cardNum: action.payload.cardNum,
        saleAmount: action.payload.saleAmount,
        id: Math.random().toString(16)
      }
      updatedAdmins = state.admins.map(admin => {
        if (admin.isLogIn) {
          newOrders = [...admin.orders, order]
          const newAdmin: Admin = {...admin, orders: newOrders}
          return newAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case 'updateOrder': {
      let updatedOrder
      const updatedAdmins = state.admins.map(admin => {
        if (admin.isLogIn) {
          updatedOrder = admin.orders.map(order => {
              if (order.id === action.payload.id) {
                return {
                  ...order, 
                  name: action.payload.name,
                  date: action.payload.date,
                  address: action.payload.address,
                  saleAmount: action.payload.saleAmount,
                  cardType: action.payload.paymentMethod,
                  cardNum: action.payload.cardNum   
                }
              }
              return order
            })
          const updatedAdmin: Admin = {...admin, orders: updatedOrder}
          return updatedAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case "removeOrder": {
      let updatedOrder
      const updatedAdmins = state.admins.map(admin => {
        if (admin.isLogIn) {
          updatedOrder = admin.orders.filter(order => {
              return order.id !== action.payload.id
            })
          const updatedAdmin: Admin = {...admin, orders: updatedOrder}
          return updatedAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    default: {
      return state
    }
  }
}

export const AdminsContext = createContext(intialState)
export const AdminsProvider  = ({children}:any) => {
  const [state,] = useReducer(reducer, intialState, () => {
    const localData = localStorage.getItem('state')
    return localData ? JSON.parse(localData) : intialState
  })
  return <AdminsContext.Provider value={state}>{children}</AdminsContext.Provider>
}
