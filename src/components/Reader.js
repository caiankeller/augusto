import { useContext } from "react";
import styled from "styled-components";
import { Text, Divider, Row, Button } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";

import { ReadingContext } from "../Reading";

export default function Reader() {
  const { reading, dispatch } = useContext(ReadingContext);

  return (
    <Container>
      <Box>
        <Row justify="space-between" align="center">
          <Text b color="#161616">
            {reading.book.title}
          </Text>
          <Button
            color="error"
            size="sm"
            auto
            onPress={() => dispatch({ type: "UNSELECT_BOOK" })}
          >
            <FiArrowLeft />
          </Button>
        </Row>
        <Divider css={{ marginTop: "0.5rem", backgroundColor: "#161616" }} />
        <Text i color="#161616">
          {reading.book.language}
        </Text>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1rem;
  background: #e8e8e8;
  border-radius: 0.5rem;
`;
