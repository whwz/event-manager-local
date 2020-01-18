import React, { Component } from "react";
import axios from "axios";
import { Link, RouteComponentProps } from "react-router-dom";
import { Event, URI, EventsListState } from "./utils";
import { Spinner } from "./Spinner";
import "../styles/events-list.css";

class EventsList extends Component<RouteComponentProps, EventsListState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { events: [], spinner: false };
  }

  componentDidMount() {
    this.setState({ spinner: true });
    setTimeout(() => {
      axios
        .get(URI.READ)
        .then(response => {
          this.setState({ events: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
      this.setState({ spinner: false });
    }, 2000);
  }

  private deleteEvent = (id: string | undefined) => {
    axios
      .delete(URI.DELETE + id)
      .then(response => console.log(response))
      .catch(function(error) {
        console.log(error);
      });

    const updatedEvents = this.state.events.filter(event => event._id !== id);
    this.setState({ events: updatedEvents });
  };

  render() {
    const { events, spinner } = this.state;

    const sortByDateAndTime = (a: Event, b: Event) =>
      a.date.localeCompare(b.date) || a.time.localeCompare(b.time);

    return (
      <div className="container">
        <div className="events-list">
          <Link to="/add" style={{ textDecoration: "none" }}>
            <input type="button" value="Add new event" />
          </Link>
          {spinner ? (
            <Spinner classname="spinner" />
          ) : (
            events.sort(sortByDateAndTime).map((event: Event) => {
              const d = new Date(event.date);
              const year = d.getFullYear();
              const month = d.toLocaleString("en-us", { month: "short" });
              const day = d.getDate();

              return (
                <div key={event._id} className="event">
                  <div className="left">
                    <div className="day">{day}</div>
                    <div className="month-year">
                      {month} {year}
                    </div>
                    <div className="time">{event.time}</div>
                  </div>
                  <div className="right">
                    <div className="edit">
                      <Link to={"/edit/" + event._id}>
                        <img
                          className="edit"
                          src={require("../assets/edit.svg")}
                          alt="edit"
                        />
                      </Link>
                    </div>
                    <img
                      className="delete"
                      src="https://image.flaticon.com/icons/svg/32/32178.svg"
                      alt="delete"
                      onClick={() => this.deleteEvent(event._id)}
                    />

                    <div className="content">
                      <div>
                        <b>{event.title}</b>
                      </div>
                      <div>
                        <i>{event.location}</i>
                      </div>
                      {event.description ? (
                        <div className="description">{event.description}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default EventsList;
