import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { ImStatsBars } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import "./Navbar.css";

// TO DO: Refactor Navbar elements into own components

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useContext(UserContext).providerValue;
  const toggleNav = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async function () {
    const response = await fetch("/api/v1/users/log-out");
    const data = await response.json();
    console.log(data);
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 60);
  };

  const setScreenSize = () => {
    if (window.innerWidth > 950) setIsMobile(false);
    if (window.innerWidth <= 950) setIsMobile(true);
  };

  const handleAccordionClick = (event) => {
    if (
      !event.currentTarget.contains(event.relatedTarget) &&
      toggleNav.current.getAttribute("aria-expanded") === "true"
    ) {
      toggleNav.current.click();
    }
  };

  useEffect(() => {
    setScreenSize();
  }, []);

  window.addEventListener("resize", setScreenSize);

  if (!user)
    return (
      <nav className="navbar">
        <NavLink to="/">
          <Heading size="md">WorkoutLogger</Heading>
        </NavLink>
        <Spacer></Spacer>
        <NavLink to="/login">
          <Button margin="17px" variant="outline">
            Login
          </Button>
        </NavLink>
        <NavLink to="/sign-up">
          <Button className="sign-up" variant="solid">
            Sign up
          </Button>
        </NavLink>
      </nav>
    );

  if (user && !isMobile)
    return (
      <nav className="navbar">
        <div className="even-spacing">
          <NavLink to="/dashboard">
            <Heading size="md">WorkoutLogger</Heading>
          </NavLink>
          <Spacer></Spacer>
        </div>
        <div className="even-spacing">
          <ButtonGroup>
            <NavLink
              to="/my-workouts"
              className={(props) => (props.isActive ? "active-nav" : "")}
            >
              <Button
                size="sm"
                className="my-workouts"
                leftIcon={<Icon as={GiWeightLiftingUp} />}
              >
                My workouts
              </Button>
            </NavLink>
            <NavLink
              to="/my-stats"
              className={(props) => (props.isActive ? "active-nav" : "")}
            >
              <Button
                size="sm"
                className="my-stats"
                leftIcon={<Icon as={ImStatsBars} />}
              >
                My stats
              </Button>
            </NavLink>
            <NavLink
              to="/new-workout"
              className={(props) => (props.isActive ? "active-nav" : "")}
            >
              <Button size="sm" className="new-workout" leftIcon={<AddIcon />}>
                {" "}
                New workout
              </Button>
            </NavLink>
          </ButtonGroup>
        </div>
        <div className="even-spacing">
          <Spacer></Spacer>

          <div onBlur={handleAccordionClick}>
            <Accordion allowToggle="true">
              <div className="accordion-container">
                <AccordionItem border="none" position="relative">
                  <AccordionButton className="accordion" ref={toggleNav}>
                    <Avatar size="sm" m="2"></Avatar>
                    <Text color="white">{user.username}</Text>

                    <AccordionIcon color="white" outline="none" />
                  </AccordionButton>
                  <AccordionPanel
                    bgColor="white"
                    pb="2.5"
                    borderBottomRadius="10"
                    mt="2"
                    boxShadow="lg"
                  >
                    <NavLink to="/settings">Settings</NavLink>
                  </AccordionPanel>
                </AccordionItem>
              </div>
            </Accordion>
          </div>

          <Button
            margin="17px"
            className="logout"
            variant="outline"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </nav>
    );

  if (user && isMobile)
    return (
      <nav className="navbar">
        <div className="even-spacing">
          <NavLink to="/dashboard">
            <Heading size="md" p="2">
              WL
            </Heading>
          </NavLink>
          <Spacer></Spacer>
        </div>
        <div className="even-spacing">
          <div onBlur={handleAccordionClick}>
            <Accordion allowToggle="true">
              <div className="accordion-mobile-container">
                <AccordionItem border="none" position="relative">
                  <AccordionButton
                    className="accordion"
                    width="180px"
                    display="flex"
                    justifyContent="center"
                    ref={toggleNav}
                  >
                    <Avatar size="sm" m="2"></Avatar>
                    <Text color="white" isTruncated width="max-content">
                      {user.username}
                    </Text>

                    <AccordionIcon color="white" outline="none" />
                  </AccordionButton>
                  <AccordionPanel
                    className="grey-brand"
                    pb="2.5"
                    borderBottomRadius="10"
                    mt="2"
                    boxShadow="lg"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <NavLink
                      to="/my-workouts"
                      className={(props) =>
                        props.isActive ? "active-nav" : ""
                      }
                    >
                      <Button
                        m="1"
                        size="sm"
                        width="130px"
                        className="my-workouts"
                        leftIcon={<Icon as={GiWeightLiftingUp} />}
                      >
                        My workouts
                      </Button>
                    </NavLink>
                    <NavLink
                      to="/my-stats"
                      className={(props) =>
                        props.isActive ? "active-nav" : ""
                      }
                    >
                      <Button
                        m="1"
                        size="sm"
                        width="130px"
                        className="my-stats"
                        leftIcon={<Icon as={ImStatsBars} />}
                      >
                        My stats
                      </Button>
                    </NavLink>
                    <NavLink
                      to="/new-workout"
                      className={(props) =>
                        props.isActive ? "active-nav" : ""
                      }
                    >
                      <Button
                        m="1"
                        size="sm"
                        width="130px"
                        className="new-workout"
                        leftIcon={<AddIcon />}
                      >
                        {" "}
                        New workout
                      </Button>
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className={(props) =>
                        props.isActive ? "active-nav" : ""
                      }
                    >
                      <Button
                        m="1"
                        size="sm"
                        width="130px"
                        className="new-workout"
                        leftIcon={<SettingsIcon />}
                      >
                        {" "}
                        Settings
                      </Button>
                    </NavLink>
                    <Button
                      margin="17px"
                      className="logout"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </div>
      </nav>
    );
}
