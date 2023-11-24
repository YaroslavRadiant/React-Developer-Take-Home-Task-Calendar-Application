import { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent, editEvent } from "../../redux/actions/eventsActions";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

import { Button, OutlinedInput } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./EventItem.css";

const EventItem = memo(({ event, selectedDate }) => {
  const [modeFlag, setModeFlag] = useState(false);
  const [erorName, setErrorName] = useState(false);
  const [nameValue, setNameValue] = useState(event.name);
  const [descriptionValue, setDescriptionValue] = useState(event.description);
  const [timePickerValue, setTimePickerValue] = useState(dayjs());

  useEffect(() => {
    if (nameValue === "") {
      setErrorName(true);
    }
    if (nameValue !== "" && erorName) {
      setErrorName(false);
    }
  }, [nameValue, erorName]);

  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(deleteEvent({ date: selectedDate, id: event.id }));
  };

  const handleChangeFlag = () => {
    if (!modeFlag) {
      setModeFlag(true);
      return;
    }
    if (nameValue === "") {
      setErrorName(!erorName);
      return;
    }
    dispatch(
      editEvent({
        date: selectedDate,
        id: event.id,
        updatedData: {
          name: nameValue,
          description: descriptionValue,
          time: timePickerValue.format().slice(11, 19),
        },
      })
    );
    setModeFlag(false);
  };

  const changeFieldsToInputs = () => {
    return !modeFlag ? (
      <div className="item">
        <p className="item__text">
          <span>Name of event:</span> {event.name}
        </p>
        <p className="item__text">
          <span>Description:</span>{" "}
          {event.description !== "" ? event.description : "No description"}
        </p>
        <p className="item__text">
          <span>Time:</span>{" "}
          {typeof event.time === "string"
            ? event?.time
            : event?.time?.format()?.slice(11, 19)}
        </p>
      </div>
    ) : (
      <div className="item__Form">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <OutlinedInput
            error={erorName}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Name of event"
          />
          <OutlinedInput
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            placeholder="Description(optional)"
          />
          <TimePicker
            value={timePickerValue}
            onChange={(newValue) => setTimePickerValue(newValue)}
          />
        </LocalizationProvider>
      </div>
    );
  };

  return (
    <div className="ListOfEvents-Container__item">
      {changeFieldsToInputs()}
      <div className="item__buttons-group">
        <Button variant="contained" onClick={handleDeleteEvent}>
          <Icon icon="material-symbols:delete-outline" />
        </Button>
        <Button variant="contained" onClick={handleChangeFlag}>
          <Icon
            icon={
              !modeFlag
                ? "material-symbols:edit-outline"
                : "material-symbols:save-outline"
            }
          />
        </Button>
      </div>
    </div>
  );
});

export default EventItem;
