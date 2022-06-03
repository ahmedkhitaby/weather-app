import { formatDate } from "../../utils/formatDate";
import classes from "./LocationDateTime.module.css";
interface LocationDateTimeProps {
  city: string;
  country: string;
  date: string;
  time: string;
}
const LocationDateTime = (props: LocationDateTimeProps) => {
  return (
    <div className={classes["date-location-container"]}>
      <p className={classes["date-location-info"]}>
        {props.city},&nbsp;
        {props.country}
      </p>
      <p className={classes["date-location-info"]}>{props.time}</p>
      <p className={classes["date-location-info"]}>{formatDate(props.date)}</p>
    </div>
  );
};
export default LocationDateTime;
