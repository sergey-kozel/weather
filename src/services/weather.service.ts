import { Coordinates } from "../types/coordinates";
import { Weather } from "../types/weather";

const appId = '87a6961ad4829cdbe4b24842218e1da6';

class weatherService {
  public checkCityWeather(city: string): Promise<Weather> | null {
    const cityUnified = encodeURI(city.trim().toLowerCase());
    return this.getCoordinates(cityUnified)
      .then((coordinates) => this.requestWeather(coordinates))
      .then((result) => result.json())
      .then((weather) => {
        console.log(`WEATHER: ${JSON.stringify(weather)}`);
        return {
          request: city,
          city: weather.name,
          description: weather.weather[0].main,
          icon: weather.weather[0].icon,
          temperature: Math.round(Number(weather.main.temp) - 273.15)
        }
      })
  }

  private getCoordinates(city: string): Promise<Coordinates> {
    const query = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${appId}`;
    return fetch(query)
      .then((response) => response.json())
      .then((obj) => {
        if (Array.isArray(obj) && obj.length > 0) {
          return { longitude: obj[0].lon, latitude: obj[0].lat };
        }
      });
  }

  private requestWeather(coordinates: Coordinates): Promise<Response> {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}`);
  }
}

export const WeatherService = new weatherService();
