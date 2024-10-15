import axios from "axios";
import Image from "next/image";

const apiUrl = "http://localhost:4000/api/weather";

export type weatherDataType = {
     temperature: string | null;
     icon: string | null;
};

const fetchWeatherFromAPI = async () => {
     try {
          const response = await axios.get(apiUrl);
          return response.data;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               // Axios-specific error handling
               if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error(
                         "Error response from server:",
                         error.response.status,
                         error.response.data
                    );
               } else if (error.request) {
                    // Request was made but no response was received
                    console.error("No response received:", error.request);
               } else {
                    // Something happened in setting up the request
                    console.error("Error setting up request:", error.message);
               }
          } else {
               console.error("Error fetching weather data:", error);
          }
          return [];
     }
};

const getWeatherTemperature = (weather: any) => {
     if (weather && weather.main) {
          return weather.main.temp;
     }
     return null;
};

const getWeatherIcon = (weather: any) => {
     if (weather && weather.weather) {
          return weather.weather[0].icon;
     }
     return null;
};

export const getWeatherTemperatureAndIcon =
     async (): Promise<weatherDataType | null> => {
          const weather = await fetchWeatherFromAPI();
          return {
               temperature: getWeatherTemperature(weather),
               icon: getWeatherIcon(weather),
          };
     };


export function showWeatherIcon(weatherData: weatherDataType) {
     if (weatherData && weatherData.icon) {
          return (
               <Image
                    src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
                    alt="Weather icon"
                    width={50}
                    height={50}
               />
          );
     }
     return;
}