import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Column from "./Column";
import useGlobalContext from "../hooks/useGlobalContext";
import { Box, Button, Container, HStack, Input, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import CardModal from "./CardModal";

const StyledDiv = styled(Box)`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const Board = () => {
  const {
    data,
    createColumn,
    toggleCardModal,
    activeColumns,
    isCardModalOpen,
    filterByDateAsc,
    filterByDateDec,
    filterToDoTask,
    filterPastTask,
  } = useGlobalContext();

  const [isOpen, setIsOpen] = useState();
  const [input, setInput] = useState("");

  const addColumn = (e) => {
    e.preventDefault();
    createColumn(input);
    setInput("");
    setIsOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <Container maxW='container.lg'>
      <HStack
        mt='30px'
        alignItems='center'
        justifyContent='space-between'
        background='gray.900'
        py='8px'
        px='12px'
      >
        <HStack alignItems='center' justifyContent='space-between'>
          <Text>Filtri:</Text>
          <Button
            size='sm'
            colorScheme='yellow'
            onClick={() => filterByDateAsc()}
          >
            Data +
          </Button>
          <Button
            size='sm'
            colorScheme='yellow'
            onClick={() => filterByDateDec()}
          >
            Data -
          </Button>
          <Button
            size='sm'
            colorScheme='yellow'
            onClick={() => filterToDoTask()}
          >
            ToDo
          </Button>
          <Button
            size='sm'
            colorScheme='yellow'
            onClick={() => filterPastTask()}
          >
            Past
          </Button>
        </HStack>
        <HStack>
          <Button
            colorScheme='purple'
            variant='outline'
            onClick={() => setIsOpen(true)}
          >
            New column
          </Button>
          <Button
            colorScheme='purple'
            disabled={activeColumns.length === 0}
            onClick={toggleCardModal}
          >
            New Task
          </Button>
        </HStack>
      </HStack>
      <StyledDiv mt='30px' py='18px'>
        {data.columns.map((el) => {
          return <Column key={el.id} {...el} />;
        })}
      </StyledDiv>

      <CardModal isOpen={isCardModalOpen} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a column</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={addColumn} id='column-input'>
              <Input
                value={input}
                required
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='purple'
              type='submit'
              form='column-input'
              mr={3}
            >
              Create
            </Button>
            <Button variant='ghost' onClick={() => setIsOpen(!isOpen)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Board;
