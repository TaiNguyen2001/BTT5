export interface Actions {
    type: "addAdmin" 
    | "addOrder" 
    | "updateOrder"
    | "removeOrder",
    payload: any
  }
  
  export interface Admin {
    id: string,
    userName: string,
    password: string,
    isLogIn: boolean,
    orders: Order[]
  }
  
  export interface Order {
    date: string,
    name: string,
    address: string,
    cardType: 'VISA' | 'MC' | 'AMEX',
    cardNum: string,
    saleAmount: string,
    id: string
  }
  
  export interface State {
    admins: Admin[]
  }
  
  