import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { HomeScreen } from "../screens/home";
import { TestIds } from "../testIds";
import { WeatherService } from "../services/weather.service";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock('../services/weather.service', () => ({
  WeatherService: {
    checkCityWeather: jest.fn()
  }
}));

describe('Home screen tests', () => {
  it('calls weather service with correct city', async () => {
    //const spy = jest.spyOn(WeatherService, 'requestWeather').mockReturnValue();
    const { getByTestId } = render(<HomeScreen route={null} navigation={null} /> );
    const city = 'london';
    const input = getByTestId(TestIds.HomeInput);
    const button = getByTestId(TestIds.HomeButton);

    await waitFor(() => {
      fireEvent.changeText(input, city);
      expect(input.props.value).toBe(city);
      fireEvent.press(button);
      expect(WeatherService.checkCityWeather).toBeCalledWith(city);
    })
  })
})
