import * as SecureStore from "expo-secure-store";
import { AsynStorageKeys } from "../constants/defaults";

const storeData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

const readData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (!value) return null;
    return value;
  } catch (e) {
    return null;
  }
};

const deleteData = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (e) {
    return false;
  }
};

export const fetchLoggedInUser = async () => {
  const data = await readData(AsynStorageKeys.user);
  if (!data) return null;
  return JSON.parse(data);
}

export const saveLoggedInUser = async (value) => {
  return await storeData(AsynStorageKeys.user, JSON.stringify(value));
}

export const clearLoggedInUser = async () => {
  return await deleteData(AsynStorageKeys.user);
}
