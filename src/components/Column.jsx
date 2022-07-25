import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { capitalizeFirstLetter } from "../utils";
import Card from "./Card";
import useGlobalContext from "../hooks/useGlobalContext";

const Column = ({ id, title, tasks }) => {
  const { deleteColumn } = useGlobalContext();
  return (
    <Box
      key={id}
      maxWidth='343px'
      width='100%'
      background='gray.700'
      style={{ borderRadius: "8px", position: "relative" }}
    >
      <Box mt='24px'>
        <Box px='8px' py='4px'>
          <Text textAlign='center' fontSize='18px'>
            {capitalizeFirstLetter(title)}
          </Text>
          <Button
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              borderRadius: "100%",
            }}
            colorScheme='red'
            onClick={() => deleteColumn(id)}
          >
            X
          </Button>
        </Box>
      </Box>
      <Box mt='24px'>
        <Box px='8px' py='4px' background='gray.900'>
          {tasks.length > 0 &&
            tasks
              .filter((el) => !el.done)
              .map((task) => {
                return <Card {...task} />;
              })}
        </Box>
      </Box>
    </Box>
  );
};

export default Column;
