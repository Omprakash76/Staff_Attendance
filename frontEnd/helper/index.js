import {ToastAndroid} from "react-native"

export const notifyUser = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export const validateMobileNo = (inputText) => {
  let mobileNoRegex = /^[6-9]\d{9}$/
  if (inputText && (inputText.match(mobileNoRegex))) {
    return true
  } else {
    return false
  }
}
