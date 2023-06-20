import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Weather } from "../types/weather";
import { Colors } from "../colors";
import { useState } from "react";
import { AsyncStorageKeys, AsyncStorageService } from "../services/asyncStorage.service";

export const WeatherScreen = ({ route, navigation }) => {
  const { weather, isFavourite: isFavouriteInitial } : { weather: Weather, isFavourite } = route.params;
  const [isFavourite, setIsFavourite] = useState(isFavouriteInitial);
  const onFavoritePress = () => {
    const newIsFavourite = !isFavourite;
    AsyncStorageService.set(AsyncStorageKeys.FavouriteCity, newIsFavourite ? weather.request : '')
      .then(() => {
        setIsFavourite(newIsFavourite);
      })
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }} style={styles.iconStyle} />
      <Text style={styles.cityLabel}>
        {weather.city}
      </Text>
      <Text style={styles.descriptionLabel}>
        {weather.description}
      </Text>
      <Text style={styles.temperatureLabel}>
        {`${weather.temperature} °C`}
      </Text>
      <TouchableOpacity onPress={onFavoritePress} style={styles.favouriteContainer}>
        { isFavourite ?
          <Image source={require('../../assets/favoriteActive.png')} style={[styles.favouriteImage, styles.favouriteImageActive]} /> :
          <Image source={require('../../assets/favoriteUnactive.png')} style={styles.favouriteImage} />
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
    backgroundColor: Colors.Background
  },
  cityLabel: {
    color: Colors.TextLabel,
    fontSize: 28
  },
  descriptionLabel: {
    color: Colors.TextLabel,
    fontSize: 20,
    marginVertical: 20
  },
  temperatureLabel: {
    color: Colors.TextLabel,
    fontSize: 24
  },
  iconStyle: {
    width: 125,
    height: 125,
    resizeMode: 'contain'
  },
  favouriteContainer: {
    marginTop: 20
  },
  favouriteImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  favouriteImageActive: {
    tintColor: 'red'
  }
})
