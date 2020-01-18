const baseURI = "http://localhost:8080/events/";

export const URI = {
  CREATE: `${baseURI}add/`,
  READ: baseURI,
  UPDATE: `${baseURI}update/`,
  DELETE: `${baseURI}delete/`
};

export type SubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.FormEvent<HTMLInputElement>;

export interface Event extends IdInterface {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface IdInterface {
  _id?: string;
}

export interface RouteComponentProps {
  match: {
    params: {
      id: string;
    };
  };
}

export interface EventsListState {
  events: Event[];
  spinner: boolean;
}

export interface SpinnerProps {
  classname: string;
}
