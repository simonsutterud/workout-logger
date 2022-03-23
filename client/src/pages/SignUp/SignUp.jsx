import React from "react";
import { useState, useContext } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

import handleSignUp from "../../utils/handleSignUp";

import { UserContext } from "../../hooks/UserContext";

import { useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";

import "./SignUp.css";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useContext(UserContext).providerValue;

  let navigate = useNavigate();

  const URL = "127.0.0.1:3000/api/v1";

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async function (e) {
    try {
      e.preventDefault();

      const username = document.querySelector("#field-1")?.value;
      const email = document.querySelector("#field-2")?.value;
      const password = document.querySelector("#field-3")?.value;

      if (!username || !email || !password)
        throw new Error("Please fill out all the fields!");

      const userData = await handleSignUp(username, email, password);

      if (userData) {
        setUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Sign up</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="Username" id="field-1" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    id="field-2"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="field-3"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" to="/login">
          Login
        </Link>
      </Box>
    </Flex>
  );
}
