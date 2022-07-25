import React from "react";
import { Button, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack mt='10px' justifyContent='space-around'>
      <Text fontSize='6xl' color='yellow.300'>
        TODO List
      </Text>
      <HStack>
        <Button colorScheme='purple'>
          <Link to='/'>Home</Link>
        </Button>
        <Button colorScheme='purple'>
          <Link to='/archivio'>Archive</Link>
        </Button>
      </HStack>
    </HStack>
  );
};

export default Navbar;
