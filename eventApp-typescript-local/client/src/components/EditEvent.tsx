import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URI, InputEvent, SubmitEvent, Event } from "./utils";
import BaseEvent from "./Event";
import "../styles/main.css";
import "../styles/form.css";

class EditEvent extends BaseEvent<InputEvent, SubmitEvent, Event> {
  state = {
    _id: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(URI.READ + id)
      .then(response => {
        const { _id, title, date, time, location, description } = response.data;
        this.setState({
          _id,
          title,
          date,
          time,
          location,
          description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleInputChange = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const { title, date, time, location, description } = this.state;
    const { id } = this.props.match.params;

    const newEvent = {
      title,
      date,
      time,
      location,
      description
    };

    axios.post(URI.UPDATE + id, newEvent).then(res => {
      console.log(res.data);
      this.success();
    });
  };

  render() {
    const { title, date, time, location, description } = this.state;
    const enabled = title && date && time;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            max-length="15"
            value={title}
            onChange={this.handleInputChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={date}
            onChange={this.handleInputChange}
          />
          <input
            type="time"
            name="time"
            placeholder="Time"
            value={time}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            max-length="15"
            value={location}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Additional info"
            max-length="15"
            value={description}
            onChange={this.handleInputChange}
          />
          <input type="submit" disabled={!enabled} value="Update event" />
          {enabled ? null : (
            <div className="require">Title, date and time is required.</div>
          )}
        </form>
        <Link to="/" style={{ textDecoration: "none" }}>
          <input type="button" value="Back" />
        </Link>
      </div>
    );
  }
}

export default EditEvent;
