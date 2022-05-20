import { AsyncStorage } from "react-native";

export const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const readData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) return value;
  } catch (e) {
    return null;
  }
};

export const deleteData = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
    return true;
  } catch (e) {
    return false;
  }
};
