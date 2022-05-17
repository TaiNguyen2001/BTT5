const validateName = (name: string) => {
  if (name.trim() === "") {
    return 0
  }
  return 1
}

const validateAddress = (address: string) => {
  if (address.trim() === "") {
    return 0
  }
  return 1
}

const validateDate = (date: string) => {
  if (date.trim() === "") {
    return 0
  }
  return 1
}

const validateSaleAmount = (saleAmount: string) => {
  if (saleAmount.trim() === "") {
    return 0
  }
  return 1
}

const validateCardType = (cardType: string) => {
  if (cardType.trim() === "") {
    return 0
  }
  return 1
}

const validateCardNum = (cardNum : string) => {
  if (cardNum.trim() === "") {
    return 0
  } else if (cardNum.trim().length !== 8) {
    return 0
  }
  return 1
}

export const validateUserName = (userName: string) => {
  if (userName.trim() === "") {
    alert("Please Enter user name !!")
    return 0
  }
  return 1
}

export const validatePassword = (password: string) => {
  if (password.trim() === "") {
    alert("Please Enter password !!")
    return 0
  } else if (password.trim().length < 6) {
    alert("Password is too short!!")
    return 0
  }
  return 1
}

export const validate = (
  name: string, 
  address: string,
  date: string,
  saleAmount: string,
  cardNum: string,
  cardType: string) => {
  return validateName(name) 
  && validateAddress(address)
  && validateDate(date)
  && validateCardNum(cardNum)
  && validateCardType(cardType)
  && validateSaleAmount(saleAmount)
}