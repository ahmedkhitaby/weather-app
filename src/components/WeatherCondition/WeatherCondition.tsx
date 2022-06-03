import classes from "./WeatherCondition.module.css";
interface WeatherConditionProps {
  imageUrl: string;
  condition: string;
}
const WeatherCondition = (props: WeatherConditionProps) => {
  return (
    <>
      <div className={classes["condition-container"]}>
        <img
          src={props.imageUrl}
          className={classes["condition-image"]}
          alt={`weather is ${props.condition} today`}
        />
        <div className={classes["condition-label"]}>{props.condition}</div>
      </div>
    </>
  );
};
export default WeatherCondition;
