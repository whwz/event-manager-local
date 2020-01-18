import React from "react";
import { SpinnerProps } from "./utils";
import "../styles/spinner.css";

export const Spinner = (props: SpinnerProps) => (
  <div className={props.classname}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
