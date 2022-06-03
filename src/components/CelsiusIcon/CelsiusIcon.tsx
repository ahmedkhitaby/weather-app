import { HTMLAttributes } from "react";

interface CelsiusIconProps extends HTMLAttributes<HTMLSpanElement> {}

const CelsiusIcon = (props: CelsiusIconProps) => {
  return <span {...props}>&#8451;</span>;
};
export default CelsiusIcon;
