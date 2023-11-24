import {
  ADD_NEW_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
} from "../actions/eventsActions";

const initialState = {
  allEvents: {},
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_NEW_EVENT: {
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          [payload.date]: {
            events: [
              ...(state.allEvents[payload.date]?.events || []),
              {
                id: payload.id,
                name: payload.name,
                description: payload.description,
                time: payload.time,
              },
            ],
          },
        },
      };
    }

    case EDIT_EVENT: {
      const { date, id, updatedData } = payload;

      const eventIndex = state.allEvents[date].events.findIndex(
        (event) => event.id === id
      );

      if (eventIndex !== -1) {
        const updatedState = {
          ...state,
          allEvents: {
            ...state.allEvents,
            [date]: {
              events: [...state.allEvents[date].events],
            },
          },
        };

        updatedState.allEvents[date].events[eventIndex] = {
          ...updatedState.allEvents[date].events[eventIndex],
          ...updatedData,
        };

        return updatedState;
      }

      return state;
    }

    case DELETE_EVENT: {
      let updatedState = {
        ...state,
        allEvents: {
          ...state.allEvents,
          [payload.date]: {
            events: state.allEvents[payload.date].events.filter(
              (event) => payload.id !== event.id
            ),
          },
        },
      };

      if (updatedState.allEvents[payload.date].events.length === 0) {
        delete updatedState.allEvents[payload.date];
      }
      return updatedState;
    }
    default:
      return state;
  }
};

export default rootReducer;
