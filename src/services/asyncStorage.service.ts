import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageKeys = {
  FavouriteCity: 'favourite-city'
}

class asyncStorageService {
  public get(key: string, defaultValue?: any): Promise<any> {
    return AsyncStorage.getItem(key)
      .then((result) => {
        if (result === null && defaultValue) {
          return JSON.stringify(defaultValue);
        }
        return result;
      })
      .catch(() => {
        if (defaultValue) {
          return JSON.stringify(defaultValue);
        }
        return null;
      });
  }

  public set(key: string, data: string): Promise<void> {
    return AsyncStorage.setItem(key, data);
  }

  public remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export const AsyncStorageService = new asyncStorageService();
