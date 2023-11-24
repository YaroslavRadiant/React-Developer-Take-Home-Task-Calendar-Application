import React from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";
import { addNewEvent } from "../../redux/actions/eventsActions";

import { Button, OutlinedInput } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: dayjs(),
      time: dayjs(),
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string(),
      date: yup.date().required("Date is required"),
      time: yup.date().required("Time is required"),
    }),
    onSubmit: (values) => {
      const eventData = {
        name: values.name,
        description: values.description,
        date: values.date.format().slice(0, 10),
        time: values.time.format().slice(11, 19),
        id: Date.now(),
      };
      dispatch(addNewEvent(eventData));
    },
  });

  return (
    <div className="App-main__form">
      <h3>Add new event</h3>
      <OutlinedInput
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Name of event"
        name="name"
        error={!!formik.errors.name}
      />

      <OutlinedInput
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Description(optional)"
        name="description"
      />

      <DatePicker
        disablePast
        views={["year", "month", "day"]}
        value={formik.values.date}
        onChange={(newValue) => formik.setFieldValue("date", newValue)}
        onBlur={formik.handleBlur}
        error={!!formik.errors.date}
      />

      <div className="App-main__form__pickers">
        <TimePicker
          value={formik.values.time}
          onChange={(newValue) => formik.setFieldValue("time", newValue)}
          onBlur={formik.handleBlur}
          error={!!formik.errors.time}
        />

        <Button variant="contained" onClick={formik.handleSubmit}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Form;
