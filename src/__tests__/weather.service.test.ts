import { WeatherService } from "../services/weather.service";

const json = {"name": "London", "weather": [{"main": "Clouds", "icon": "01b"}], "main": {"temp": 300.35 }};

describe('weather service tests', () => {
  it('weather service returns correct weather object', () => {
    const fetchMock = jest.fn();
    const spy = jest.spyOn(WeatherService, 'requestWeather').mockReturnValue(Promise.resolve({ json: () => Promise.resolve(json) } ));
    jest.spyOn(WeatherService, 'getCoordinates').mockReturnValue(Promise.resolve({ latitude: 0, longitude: 0 }));
    WeatherService.checkCityWeather(' london ')
      .then((result) => {
        expect(typeof result).toBe('object');
        expect(result.request).toBe(' london ');
        expect(result.city).toBe('London');
        expect(result.description).toBe('Clouds');
        expect(result.icon).toBe('01b');
        expect(result.temperature).toBe(27);
      })
  })
})
