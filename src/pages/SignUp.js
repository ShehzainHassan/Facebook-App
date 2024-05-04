import React from "react";
import Select from "react-select";
import "./SignUp.css";
import { Button } from "@chakra-ui/react";
function SignUp() {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: i });
  }
  const years = [];
  for (let i = 2024; i >= 1905; i--) {
    years.push({ value: i, label: i });
  }
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="title">Sign Up</div>
        <div className="description">It's quick and easy</div>
        <div className="person-name">
          <input className="fname" type="text" placeholder="First name" />
          <input className="lname" type="text" placeholder="Surname" />
        </div>
        <div></div>
        <input
          className="mobile-email"
          type="text"
          placeholder="Mobile number or email address"
        />
        <input
          className="new-password"
          type="text"
          placeholder="New password"
        />
        <div className="dob-label">Date of Birth</div>
        <div className="dob">
          <Select
            id="date"
            defaultValue={{ label: "Day" }}
            options={days}
            className="full-width"
          />
          <Select
            id="month"
            defaultValue={{ label: "Month" }}
            options={months}
            className="full-width"
          />
          <Select
            id="year"
            defaultValue={{ label: "Year" }}
            options={years}
            className="full-width"
          />
        </div>
        <div className="gender-label"> Gender</div>
        <div className="gender">
          <label className="female">
            Female
            <input type="radio" value="option1" name="options" />
          </label>
          <label className="male">
            Male
            <input type="radio" value="option2" name="options" />
          </label>
        </div>
        <Button
          colorScheme="green.200"
          className="sign-up-btn"
          _hover={{ bg: "green.400" }}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
export default SignUp;
