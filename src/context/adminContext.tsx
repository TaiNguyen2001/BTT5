import { createContext, useReducer } from "react"
import { State, Actions, Admin, Order, } from './type'
import { useEffect } from "react"

const intialState: State = {
  admins: []
}

export const reducer = function(state: State, action: Actions) {
  switch (action.type) {
    case "FetchData":{
      const newState = { ...state, admins: action.payload }
      return newState
    }
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
      let option = {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newAdmin)
      }
      fetch("http://localhost:5000/admins", option)
      .then((res) => res.json())
      return newState
    }
    case 'addOrder': {
      let newOrders: Order[]
      let id : string
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
          id = admin.id
          newOrders = [...admin.orders, order]
          const newAdmin: Admin = {...admin, orders: newOrders}
          let option = {
            method: "PATCH",
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newAdmin)
          }
          fetch("http://localhost:5000/admins/" + id , option)
          .then((res) => res.json())
          return newAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
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
          let option = {
            method: "PATCH",
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(updatedAdmin)
          }
          fetch("http://localhost:5000/admins/" + admin.id , option)
          .then((res) => res.json())
          return updatedAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
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
          let option = {
            method: "PATCH",
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(updatedAdmin)
          }
          fetch("http://localhost:5000/admins/" + admin.id , option)
          .then((res) => res.json())
          return updatedAdmin
        }
        return admin
      })
      const newState = {...state,
        admins: updatedAdmins
      }
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
  const [state,dispatch] = useReducer(reducer, intialState)
  useEffect(() => {
    fetch("http://localhost:5000/admins")
      .then(response => response.json())
      .then(res => dispatch({type: 'FetchData', payload: res}));
  }, [])
  return <AdminsContext.Provider value={state}>{children}</AdminsContext.Provider>
}
