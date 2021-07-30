import React, { useState, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Alert, AlertTitle } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { API_PROD } from "../api";
let fetch = require("node-fetch");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(3),
      },
    },
    formControl: {
      minWidth: 230,
    },
    datePicker: {
      marginLeft: "25px",
      marginTop: "25px",
    },
    textArea: {
      width: "500px",
      fontSize: "16px",
      padding: "10px",
    },
  })
);

const FirstPage: React.FC<{}> = () => {
  const classes = useStyles();

  const [name, setName] = useState<string | null>("");
  const [age, setAge] = useState<string>("");
  const [dob, setDob] = useState<Date | null>(new Date("2014-08-18T21:11:54"));
  const [profession, setProfession] = useState<string | null>("");
  const [locality, setLocality] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isInserted, setIsInserted] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setDob(date);
  };

  const handleProfessionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProfession(event.target.value as string);
  };

  const handleGuestsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGuests(event.target.value as string);
  };

  const handleLocalityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLocality(event.target.value as string);
  };

  const handleClick = (e: any) => {
    var result = {
      name: name,
      age: parseInt(age),
      dob: dob?.toDateString(),
      profession: profession,
      locality: locality,
      numberOfGuests: parseInt(guests),
      address: address,
    };

    fetch(`${API_PROD}/save`, {
      method: "POST",
      body: JSON.stringify(result),
      headers: { "Content-Type": "application/json" },
    })
      .then((res: { json: () => any }) => res.json())
      .then(() => {
        setName("");
        setAge("");
        setProfession("");
        setLocality("");
        setGuests("");
        setAddress("");
        setIsInserted(true);
        setTimeout(() => {
          setIsInserted(false);
        }, 3000);
      });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message = "Are you sure you want to leave?";
    e.returnValue = message;
    return message;
  };

  return (
    <>
      {isInserted && (
        <div className="sucessMessage">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Data Inserted — <strong>Successfully!</strong>
          </Alert>
        </div>
      )}
      <div className="condiv home" style={{ marginTop: "50px" }}>
        <h1>RSVP Registration Form</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {/* name  */}
            <FormControl variant="outlined" style={{ margin: "20px" }}>
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            {/* age */}
            <FormControl variant="outlined" style={{ margin: "20px" }}>
              <InputLabel htmlFor="component-outlined">Age</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
            {/* date of birth */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                allowKeyboardControl
                format="dd/MM/yyyy"
                margin="dense"
                label="Date of Birth"
                value={dob}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className={classes.datePicker}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            {/* profession */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ margin: "20px" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Profession
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={profession}
                onChange={handleProfessionChange}
                label="Profession"
              >
                <MenuItem value={"Employee"}>Employee</MenuItem>
                <MenuItem value={"Student"}>Student</MenuItem>
              </Select>
            </FormControl>
            {/* locality */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ margin: "20px" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Locality
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={locality}
                onChange={handleLocalityChange}
                label="Locality"
              >
                <MenuItem value={"Chennai"}>Chennai</MenuItem>
                <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
              </Select>
            </FormControl>
            {/* No.of guests */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ margin: "20px" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                No.of Guests
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={guests}
                onChange={handleGuestsChange}
                label="No.of Guests"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* address */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextareaAutosize
              minRows={5}
              minLength={100}
              placeholder="Enter your Address"
              className={classes.textArea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* submit */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FirstPage;
