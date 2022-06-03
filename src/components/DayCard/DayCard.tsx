import { formatDate } from "../../utils/formatDate";
import Temperature from "../Temperature/Temperature";
import classes from "./DayCard.module.css";
interface DayCardProps {
  date: string;
  averageTemp: number;
  maxTemp: number;
  minTemp: number;
}
const DayCard = (props: DayCardProps) => {
  return (
    <div className={classes["day-card"]}>
      <span className={classes["day-date"]}>{formatDate(props.date)}</span>
      <Temperature
        averageTemp={props.averageTemp}
        maxTemp={props.maxTemp}
        minTemp={props.minTemp}
      />
    </div>
  );
};
export default DayCard;
