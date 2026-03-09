import Toast from "react-native-toast-message";

export const showSuccess = (title, msg) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: msg,
    position: "top",
  });
};

export const showError = (title, msg) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: msg,
    position: "top",
  });
};

export const showInfo = (title, msg) => {
  Toast.show({
    type: "info",
    text1: title,
    text2: msg,
    position: "top",
  });
};
