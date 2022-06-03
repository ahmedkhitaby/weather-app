import { getWeatherByCityApiUrl } from "../../apis/weather";
import LocationDateTime from "../../components/LocationDateTime/LocationDateTime";
import Temperature from "../../components/Temperature/Temperature";
import WeatherCondition from "../../components/WeatherCondition/WeatherCondition";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import classes from "./CityDetails.module.css";
import { drawChart } from "../../components/Charts/WeatherChart";

const CityDetails = () => {
  const { city } = useParams();
  const { data, error, loading } = useFetch(
    getWeatherByCityApiUrl(city as string)
  );

  if (loading) {
    return <div className={classes["city-details-page"]}>Loading...</div>;
  }
  if (error || data.data.error) {
    return (
      <div className={classes["city-details-page"]}>
        Unable to find any matching weather location
      </div>
    );
  }
  return (
    <div className={classes["city-details-page"]}>
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
      <section className={classes["chart-container"]}>
        <h1 className={classes["chart-heading"]}>
          The weather through the day
        </h1>

        {drawChart(data.data.weather[0].hourly)}
      </section>
    </div>
  );
};
export default CityDetails;
