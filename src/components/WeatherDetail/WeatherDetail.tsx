import classes from "./WeatherDetail.module.css";
interface WeatherDetailProps {
  label: string;
  quantity: number;
  unit: string;
}

const WeatherDetail = (props: WeatherDetailProps) => {
  return (
    <div className={classes["weather-detail"]}>
      <div className={classes["detail-measure-container"]}>
        <p className={classes["detail-quantity"]}>{props.quantity}</p>
        <span className={classes["detail-unit"]}>{props.unit}</span>
      </div>
      <p className={classes["detail-label"]}>{props.label}</p>
    </div>
  );
};
export default WeatherDetail;
