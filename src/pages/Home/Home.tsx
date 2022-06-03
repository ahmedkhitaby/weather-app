import { getWeatherByCoordinatesApiUrl } from "../../apis/weather";
import DayCard from "../../components/DayCard/DayCard";
import LocationDateTime from "../../components/LocationDateTime/LocationDateTime";
import Temperature from "../../components/Temperature/Temperature";
import WeatherCondition from "../../components/WeatherCondition/WeatherCondition";
import WeatherDetail from "../../components/WeatherDetail/WeatherDetail";
import useFetch from "../../hooks/useFetch";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import classes from "./Home.module.css";
const Home = () => {
  const { latitude, longitude } = useGeoLocation();
  const { data, error, loading } = useFetch(
    getWeatherByCoordinatesApiUrl(latitude, longitude)
  );

  if (!latitude && !longitude)
    return (
      <div className={classes["home-page"]}>
        This application needs access to access your location
      </div>
    );
  if (loading) {
    return <div className={classes["home-page"]}>Loading...</div>;
  }
  if (error || data.data.error) {
    return (
      <div className={classes["home-page"]}>
        Unable to find any matching weather location
      </div>
    );
  }
  return (
    <div className={classes["home-page"]}>
      <div className={classes["city-temperature-container"]}>
        <LocationDateTime
          city={data.data.nearest_area[0].region[0].value}
          country={data.data.nearest_area[0].country[0].value}
          time={data.data.time_zone[0].localtime.split(" ")[1]}
          date={data.data.time_zone[0].localtime.split(" ")[0]}
        />
        <Temperature
          averageTemp={data.data.current_condition[0].temp_C}
          maxTemp={data.data.weather[0].maxtempC}
          minTemp={data.data.weather[0].mintempC}
        />
      </div>
      <section className={classes["weather-condition"]}>
        <WeatherCondition
          condition={data.data.current_condition[0].weatherDesc[0].value}
          imageUrl={data.data.current_condition[0].weatherIconUrl[0].value}
        />
      </section>
      <section className={classes["weather-details"]}>
        <WeatherDetail
          label='wind speed'
          quantity={data.data.current_condition[0].windspeedKmph}
          unit='km/h'
        />
        <WeatherDetail
          label='humidity'
          quantity={data.data.current_condition[0].humidity}
          unit='%'
        />
        <WeatherDetail
          label='pressure'
          quantity={data.data.current_condition[0].pressure}
          unit='hpa'
        />
      </section>
      <section>
        <h1 className={classes["days-heading"]}>The weather for next week</h1>
        <div className={classes["days-container"]}>
          {data.data.weather.map((day: any, index: number) => {
            if (index === 0) return null;
            return (
              <div key={day.date} className={classes["day-card-container"]}>
                <DayCard
                  date={day.date}
                  averageTemp={day.avgtempC}
                  maxTemp={day.maxtempC}
                  minTemp={day.mintempC}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Home;
