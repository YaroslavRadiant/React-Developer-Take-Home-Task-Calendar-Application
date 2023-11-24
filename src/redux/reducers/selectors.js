import { createSelector } from "reselect";

const getAllEvents = (state) => state.allEvents;

const getSelectedDate = (state, selectedDate, dateOfEvents) =>
  selectedDate ? selectedDate : dateOfEvents;

export const selectEventsByDate = createSelector(
  [getAllEvents, getSelectedDate],
  (allEvents, selectedDate) => allEvents[selectedDate]
);
