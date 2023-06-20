import { TextInput, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import i18next from "i18next";
import { Colors } from "../colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { WeatherService } from "../services/weather.service";
import { LoadingService } from "../services/loading.service";
import { AsyncStorageKeys, AsyncStorageService } from "../services/asyncStorage.service";
import { TestIds } from "../testIds";

export const HomeScreen = ({ route, navigation }): JSX.Element => {
  const [city, setCity] = useState();
  const vm = useRef({ favouriteCity: ''}).current;
  useEffect(() => {
    AsyncStorageService.get(AsyncStorageKeys.FavouriteCity)
      .then((city) => {
        if (city) {
          setCity(city);
        }
      })
  }, []);
  const onPress = (): void => {
    if (city) {
      LoadingService.setIsLoading();
      Promise.all([
        WeatherService.checkCityWeather(city), AsyncStorageService.get(AsyncStorageKeys.FavouriteCity)])
        .then((result) => navigation.navigate('Weather', { weather: result[0], isFavourite: result[1] === city }))
        .catch(() => Alert.alert(i18next.t('REQUEST_ERROR')))
        .finally(() => LoadingService.releaseLoading());
    }
  }
  const onCityTextChange = useCallback((text) => {
    setCity(text);
  }, [city]);
  const onNextPress = useCallback(() => {

  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>
        {i18next.t('CITY_INPUT_LABEL')}
      </Text>
      <TextInput style={styles.textInput} value={city} onChangeText={onCityTextChange} testID={TestIds.HomeInput} />
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer} testID={TestIds.HomeButton}>
        <Text style={styles.buttonText}>
          {i18next.t('NEXT_BUTTON')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.Background,
    paddingBottom: 150
  },
  inputLabel: {
    color: Colors.TextLabel,
    fontSize: 18
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
    marginVertical: 25,
    fontSize: 20,
    color: Colors.TextInput,
  },
  buttonText: {
    color: Colors.TextButton,
    fontSize: 24
  },
  buttonContainer: {
    marginTop: 100,
    alignItems: 'center'
  }
})
