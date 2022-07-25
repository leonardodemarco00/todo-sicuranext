import React from "react";
import styled from "@emotion/styled";
import { Button, Text, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
import useGlobalContext from "../hooks/useGlobalContext";
import { formatDate, isInThePast } from "../utils";

const StyledCard = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  padding: 16px;
  position: relative;
  border-radius: 0px 8px 8px 0px;
  background: #2d3748;

  .spacer {
    & > *:not(:first-child) {
      margin-top: 8px;
    }
  }

  .star-container {
    & > *:not(:first-child) {
      margin-left: 2px;
    }
  }

  .card-info,
  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:after {
    content: " ";
    left: 0px;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 8px;
    position: absolute;
    background-color: yellow;
  }

  [role="edit"]: {
    display: none !important;
  }
`;

const Card = ({
  titolo,
  data,
  priorita,
  descrizione,
  done,
  id,
  isEditable = true,
  isDone,
}) => {
  const stars = Array.from({ length: Number(priorita) }, (el) => {
    return <StarIcon boxSize={3} color='orange' />;
  });

  const { toggleEditableModal, removeTask } = useGlobalContext();
  return (
    <>
      <StyledCard>
        <div className='spacer'>
          <div className='card-info'>
            <Text fontSize='md'>{titolo}</Text>
            <div className='star-container'>{stars.map((star) => star)}</div>
          </div>
          <Text fontSize='xs'>{descrizione}</Text>
          <div className='action'>
            <Text color={isInThePast(new Date(data)) ? "white" : "red"}>
              {formatDate(data)}
            </Text>
            <HStack>
              <Button
                size='xs'
                style={{
                  display: !isEditable && "none",
                }}
                onClick={toggleEditableModal}
              >
                Edit
              </Button>
              {!isDone && (
                <Button size='xs' onClick={() => removeTask(id)}>
                  Delete
                </Button>
              )}
            </HStack>
          </div>
        </div>
      </StyledCard>
      <EditModal id={id} />
    </>
  );
};

export default Card;
