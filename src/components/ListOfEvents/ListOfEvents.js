import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import EventItem from "../EventItem/EventItem";
import { selectEventsByDate } from "../../redux/reducers/selectors";
import "./ListOfEvents.css";

import { Button } from "@mui/material";

const ListOfEvents = ({ selectedDate, page }) => {
  let { dateOfEvents } = useParams();

  const events = useSelector((state) =>
    selectEventsByDate(state, selectedDate, dateOfEvents)
  );

  const selectButton = () => {
    return page === "main" ? (
      <Link to={`/${selectedDate}`}>
        <Button>Go to events page</Button>
      </Link>
    ) : (
      <Link to={`/`}>
        <Button>Go to main page</Button>
      </Link>
    );
  };

  return (
    <div className="ListOfEvents-Container">
      <h3>{selectedDate ? selectedDate : dateOfEvents}</h3>
      {selectButton()}
      {events ? (
        events.events.map((event) => {
          return (
            <EventItem
              key={event.id}
              event={event}
              selectedDate={selectedDate ? selectedDate : dateOfEvents}
            />
          );
        })
      ) : (
        <p>no events for this day</p>
      )}
    </div>
  );
};

export default ListOfEvents;
