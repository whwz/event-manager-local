import { Component } from "react";
import { RouteComponentProps } from "./utils";

abstract class BaseEvent<I, S, E> extends Component<RouteComponentProps> {
  abstract state: E;
  protected abstract handleInputChange = (event: I) => {};
  protected abstract handleSubmit = (event: S) => {};

  public success = () => {
    alert("Success");
  };
}

export default BaseEvent;
