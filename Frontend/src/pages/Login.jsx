import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = () => {
    axios
      .post("http://localhost:3000/login", {
        emailOrPhoneNo: emailOrPhone,
        pass: password,
      })
      .then((response) => {
        sessionStorage.setItem("UID", JSON.stringify(response.data.uid));
        sessionStorage.setItem(
          "FirstName",
          JSON.stringify(response.data.firstName)
        );

        setIsLoggedIn(true);
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const onEmailOrPhoneUpdate = (event) => {
    setEmailOrPhone(event.target.value);
  };

  const onPasswordUpdate = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh">
      <div className="login-container">
        <div className="facebook">
          <div className="facebook-logo">facebook</div>
          <div className="description">
            Facebook helps you connect and share with the people in your life
          </div>
        </div>
        <div className="login-form">
          <input
            className="email"
            type="text"
            placeholder="Email address or phone number"
            onChange={onEmailOrPhoneUpdate}
          />
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={onPasswordUpdate}
          />
          <Button
            colorScheme="blue"
            className="login-button"
            onClick={handleLogin} // Call handleLogin function on button click
          >
            Log In
          </Button>
          <a className="forgot-password" href="#">
            Forgotten password?
          </a>
          <Link to={"/signup"}>
            <Button
              colorScheme="green"
              onClick={onOpen}
              className="sign-up-button">
              Create a new account
            </Button>
          </Link>
        </div>
      </div>

      {isError && (
        <Alert status="error" maxW="500px" mb="4">
          <AlertIcon />
          <AlertTitle>Invalid Credentials!</AlertTitle>
          <AlertDescription>
            No user found with these credentials.
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
}

export default Login;
