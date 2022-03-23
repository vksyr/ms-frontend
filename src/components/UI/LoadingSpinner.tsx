import { FunctionComponent } from "react";
import classes from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = () => {
  return <div className={classes.spinner}></div>;
};

export default LoadingSpinner;
