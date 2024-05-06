import React from "react";
import facebook from "../assets/124010.png";
import {
  FaHome,
  FaRegFlag,
  FaPlay,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import {
  HiOutlineChatAlt2,
  HiOutlineBell,
  HiOutlineChevronDown,
} from "react-icons/hi";
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
import NavbarIcon from "./NavbarIcons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex items-center sticky top-0 z-50 bg-white p-2 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook Logo"
          height={40}
          width={40}
          onClick={onOpen}
        />

        {/* input search field */}
        <div className="flex items-center ml-2 rounded-full bg-gray-100 p-2">
          <AiOutlineSearch className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex bg-transparent ml-2 outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-2 md:space-x-6">
          <NavbarIcon active Icon={FaHome} position={"center"} />
          <NavbarIcon Icon={FaRegFlag} position="center" />
          <NavbarIcon Icon={FaPlay} position="center" />
          <NavbarIcon Icon={FaShoppingCart} position="center" />
          <NavbarIcon Icon={FaUsers} position="center" />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <NavbarIcon Icon={HiOutlineChatAlt2} />
        <NavbarIcon Icon={HiOutlineBell} />
        <NavbarIcon Icon={HiOutlineChevronDown} />

        {/* profile pic */}
        <img className="rounded-full h-10 w-10" src={facebook} alt="" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Logout</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Navbar;
