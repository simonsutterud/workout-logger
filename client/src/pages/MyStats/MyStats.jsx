import moment from "moment";

import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import "./MyStats.css";

// TO DO:
// - find out what stats to calculate
// - find out how to showcase them
// - implement it in code

export default function MyStats() {
  const prevMonday = new Date(moment().startOf("isoWeek"));
  const nextSunday = new Date(
    moment().startOf("isoWeek").add(1, "week").subtract(1, "day")
  );

  return (
    <div className="flex">
      <div className="wrapper">
        My stats:
        <div className="weekly-workouts">
          <Box
            boxSize="xs"
            boxShadow="lg"
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            bgColor="white"
            borderRadius="xl"
            padding="10"
          >
            <Stat display="flex" justifyContent="center" alignItems="center">
              <StatLabel># of training sessions this week:</StatLabel>
              <div className="weekly-workouts-percent">
                <StatNumber fontSize="xxx-large">5</StatNumber>
                <StatHelpText flex alignItems justifyContent h="3">
                  <StatArrow type="increase" />
                  25% compared to last week
                </StatHelpText>
              </div>
              <StatHelpText textAlign={"center"} mt="5">
                {prevMonday.toLocaleDateString("en-GB")} -{" "}
                {nextSunday.toLocaleDateString("en-GB")}
              </StatHelpText>
            </Stat>
          </Box>
        </div>
      </div>
    </div>
  );
}
