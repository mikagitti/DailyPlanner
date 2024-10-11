import axios from "axios";

const apiUrl = "http://localhost:4000/api/weather";

export const getWeather = async () => {
     try {
          const response = await axios.get(apiUrl);
          console.log("Weather data:", response.data);
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
