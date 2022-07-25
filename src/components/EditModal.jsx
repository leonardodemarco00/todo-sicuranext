import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import {
  Button,
  Checkbox,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";

const CardModal = ({ id }) => {
  const [column, setColumn] = React.useState("");

  const {
    isEditableModalOpen,
    toggleEditableModal,
    activeColumns,
    editCards,
    data,
  } = useGlobalContext();

  const cardColumn = data.columns.find((x) => {
    if (x.tasks.some((y) => y.id === id)) {
      return true;
    }
    return false;
  });

  const cardData = cardColumn && cardColumn.tasks.find((x) => x.id === id);

  const [checked, setChecked] = React.useState(cardData && cardData.done);

  const [input, setInput] = React.useState({
    titolo: cardData.titolo ? cardData.titolo : "",
    data: cardData ? cardData.data : new Date(Date.now()),
    priorita: cardData ? cardData.priorita : 1,
    descrizione: cardData ? cardData.descrizione : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editCards(id, { ...input, done: checked });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isEditableModalOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modify task</ModalHeader>
        <ModalCloseButton onClick={toggleEditableModal} />
        <ModalBody>
          <form
            onSubmit={handleSubmit}
            id='card-modal'
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "340px",
              marginTop: "20px",
            }}
          >
            <HStack>
              <Text>Complete task:</Text>
              <Checkbox
                isChecked={checked}
                onChange={() => setChecked(!checked)}
                size='lg'
              />
            </HStack>
            <Text>Modify name:</Text>
            <Input
              type='text'
              id='titolo'
              name='titolo'
              required
              maxLength={20}
              value={input.titolo}
              onChange={handleChange}
            />
            <Text>Modify date:</Text>
            <Input
              type='date'
              id='data'
              name='data'
              required
              value={input.data}
              onChange={handleChange}
            />
            <Text>Select priority:</Text>
            <Select
              value={input.priorita}
              id='priorita'
              name='priorita'
              onChange={handleChange}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <option
                  selected={index === 0 ? "selected" : null}
                  value={index + 1}
                >
                  {index + 1}
                </option>
              ))}
            </Select>
            <Text>Modify priority:</Text>
            <Textarea
              name='descrizione'
              id='descrizione'
              value={input.descrizione}
              onChange={handleChange}
            />
            <Select
              placeholder={"Scegli elemento"}
              value={column}
              required
              onChange={(e) => setColumn(e.target.value)}
            >
              {activeColumns.map((column, index) => (
                <option value={column.title.toLowerCase()}>
                  {column.title}
                </option>
              ))}
            </Select>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='purple' type='submit' form='card-modal' mr={3}>
            Modifica
          </Button>
          <Button variant='ghost' onClick={toggleEditableModal}>
            Annulla
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
