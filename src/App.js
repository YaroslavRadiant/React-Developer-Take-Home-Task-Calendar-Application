import { useState } from "react";
import dayjs from "dayjs";
import Form from "./components/Form/Form";
import ListOfEvents from "./components/ListOfEvents/ListOfEvents";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";

function App() {
  const [value, setValue] = useState(dayjs());

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-main-block">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App-main__calendar">
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </div>
            <Form />
          </LocalizationProvider>
        </div>
        <div>
          <ListOfEvents
            selectedDate={value.format().slice(0, 10)}
            page={"main"}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
