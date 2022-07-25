import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import Card from "./Card";
import Layout from "./Layout";

import useGlobalContext from "../hooks/useGlobalContext";

const Archive = () => {
  const { data } = useGlobalContext();
  return (
    <Layout>
      <Container maxW='container.lg'>
        <Box width='100%'>
          <Box mt='24px'>
            <Box px='8px' py='4px' background='gray.900'>
              <Text fontSize='18px'>{"Completed tasks"}</Text>
            </Box>
          </Box>
          {data.storage && data.storage.length > 0 && (
            <Box mt='24px'>
              <Box px='8px' py='4px' background='gray.900'>
                {data.storage
                  .filter((el) => el.done)
                  .map((task) => {
                    return <Card {...task} isEditable={false} isDone={true} />;
                  })}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Archive;
