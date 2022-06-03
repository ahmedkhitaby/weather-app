export const getWeatherByCoordinatesApiUrl = (
  latitude: number,
  longitude: number
) => {
  if (latitude === 0 || longitude === 0) {
    return "";
  }
  return `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}&includelocation=yes&showlocaltime=yes&format=json&num_of_days=8`;
};

export const getWeatherByCityApiUrl = (city: string) => {
  return `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&includelocation=yes&showlocaltime=yes&format=json&num_of_days=8`;
};
