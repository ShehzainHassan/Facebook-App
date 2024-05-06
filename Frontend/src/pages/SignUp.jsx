import React, { useState } from "react";
import Select from "react-select";
import "./SignUp.css";
import { Button, FormControl, Alert, AlertIcon, Input } from "@chakra-ui/react";
import axios from "axios";
function SignUp() {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    pass: "",
    emailOrPhoneNo: "",
    dob: { day: "", month: "", year: "" },
    isFemale: false,
  });
  const [error, setError] = useState("");
  const validateInput = () => {
    if (
      !info.firstName ||
      !info.lastName ||
      !info.emailOrPhoneNo ||
      !info.pass ||
      !info.dob.day ||
      !info.dob.month ||
      !info.dob.year
    ) {
      setError("All fields are required");
      return false;
    }

    if (
      !info.emailOrPhoneNo.includes("@") ||
      !info.emailOrPhoneNo.includes(".")
    ) {
      setError("Please enter a valid email address");
      return false;
    }

    if (info.pass.length < 6) {
      setError("Password should be at least 6 characters long");
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (validateInput()) {
      axios
        .post("http://localhost:3000/signUp", {
          firstName: info.firstName,
          lastName: info.lastName,
          pass: info.pass,
          emailOrPhoneNo: info.emailOrPhoneNo,
          dob: info.dob,
          isFemale: info.isFemale,
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/";
        });
      return;
    } else {
      return;
    }
  };

  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: i });
  }
  const years = [];
  for (let i = 2024; i >= 1905; i--) {
    years.push({ value: i, label: i });
  }
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  // for updating info variable
  const getUser = (event, name) => {
    // console.log("Updated info:", name,event.target.value);
    setInfo((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const updateGender = (event, gender) => {
    if (event === "Female") {
      if (gender) {
        setInfo((prevState) => ({
          ...prevState,
          isFemale: true,
        }));
      } else {
        setInfo((prevState) => ({
          ...prevState,
          isFemale: false,
        }));
      }
    } else {
      if (gender) {
        setInfo((prevState) => ({
          ...prevState,
          isFemale: false,
        }));
      } else {
        setInfo((prevState) => ({
          ...prevState,
          isFemale: true,
        }));
      }
    }
  };

  console.log("State:", info);

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="title">Sign Up</div>
        <div className="description">It's quick and easy</div>
        <div className="person-name">
          <FormControl isRequired>
            <Input
              className="fname"
              type="text"
              placeholder="First name"
              value={info.firstName}
              onChange={(event) => {
                getUser(event, "firstName");
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              className="lname"
              type="text"
              placeholder="Surname"
              value={info.lastName}
              onChange={(event) => {
                getUser(event, "lastName");
              }}
            />
          </FormControl>
        </div>
        <FormControl isRequired>
          <Input
            className="mobile-email"
            type="text"
            placeholder="Email address"
            value={info.emailOrPhoneNo}
            onChange={(event) => {
              setInfo((prevState) => ({
                ...prevState,
                emailOrPhoneNo: event.target.value,
              }));
              getUser(event, "email");
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            className="new-password"
            type="password"
            placeholder="New password"
            value={info.pass}
            onChange={(event) => {
              getUser(event, "pass");
            }}
          />
        </FormControl>
        <div className="dob-label">Date of Birth</div>
        <div className="dob">
          <Select
            id="date"
            defaultValue={{ label: "Day" }}
            value={info.dob.day && { label: info.dob.day, value: info.dob.day }}
            options={days}
            className="full-width"
            onChange={(event) =>
              setInfo((prevState) => {
                return {
                  ...prevState,
                  dob: {
                    day: event.value,
                    month: info.dob.month,
                    year: info.dob.year,
                  },
                };
              })
            }
          />
          <Select
            id="month"
            defaultValue={{ label: "Month" }}
            value={
              info.dob.month && { label: info.dob.month, value: info.dob.month }
            }
            options={months}
            className="full-width"
            onChange={(event) =>
              setInfo((prevState) => {
                return {
                  ...prevState,
                  dob: {
                    day: info.dob.day,
                    month: event.value,
                    year: info.dob.year,
                  },
                };
              })
            }
          />
          <Select
            id="year"
            defaultValue={{ label: "Year" }}
            value={
              info.dob.year && { label: info.dob.year, value: info.dob.year }
            }
            options={years}
            className="full-width"
            onChange={(event) =>
              setInfo((prevState) => {
                return {
                  ...prevState,
                  dob: {
                    day: info.dob.day,
                    month: info.dob.month,
                    year: event.value,
                  },
                };
              })
            }
          />
        </div>
        <div className="gender-label"> Gender</div>
        <div className="gender">
          <label className="female">
            Female
            <input
              type="radio"
              onChange={(e) => updateGender("Female", e.target.checked)}
              value="option1"
              name="options"
            />
          </label>
          <label className="male">
            Male
            <input
              type="radio"
              onChange={(e) => updateGender("Male", e.target.checked)}
              value="option2"
              name="options"
            />
          </label>
        </div>
        <Button
          colorScheme="green.200"
          className="sign-up-btn"
          _hover={{ bg: "green.400" }}
          onClick={handleSubmit}>
          Sign Up
        </Button>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SignUp;
