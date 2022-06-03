import CelsiusIcon from "../CelsiusIcon/CelsiusIcon";
import classes from "./Temperature.module.css";

interface TemperatureProps {
  averageTemp: number;
  minTemp: number;
  maxTemp: number;
}
const Temperature = (props: TemperatureProps) => {
  return (
    <div className={classes["temperature"]}>
      <div className={classes["average-temp-container"]}>
        <h1 className={classes["average-temp"]}>{props.averageTemp}</h1>
        <CelsiusIcon className={classes["celsius-icon"]} />
      </div>
      <div className={classes["min-max-container"]}>
        <h3 className={classes["max-temp"]}>
          &uarr; {props.maxTemp} <CelsiusIcon />
        </h3>
        <h3 className={classes["min-temp"]}>
          &darr; {props.minTemp} <CelsiusIcon />
        </h3>
      </div>
    </div>
  );
};
export default Temperature;
