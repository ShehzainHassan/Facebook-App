import "./Login.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import SignUp from "./SignUp";
function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
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
        />
        <input className="password" type="password" placeholder="Password" />
        <Button
          colorScheme="blue.400"
          className="login-button"
          _hover={{ bg: "blue.600" }}>
          Log In
        </Button>
        <a className="forgot-password" href="#">
          Forgotten password?
        </a>
        <Button
          colorScheme="green.200"
          onClick={onOpen}
          className="sign-up-button"
          _hover={{ bg: "green.400" }}>
          Create a new account
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="600px" maxW="500px">
          <ModalCloseButton />
          <ModalBody>
            <SignUp />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
