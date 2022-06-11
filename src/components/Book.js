import { useContext, useEffect, useState } from "react";
import { Card, Text, Button, Row, Spacer } from "@nextui-org/react";
import styled from "styled-components";

import { ReadingContext } from "../Reading";

export default function Book({ book }) {
  const { dispatch } = useContext(ReadingContext);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    isSelected &&
      dispatch({ type: "SELECT_BOOK", payload: { book, selected: true } });
    // eslint-disable-next-line
  }, [isSelected]);

  return (
    <Container>
      <Card
        css={{
          marginTop: "0.5rem",
          backgroundColor: "#E8E8E8",
          color: "#161616",
        }}
      >
        <Card.Header>
          <Text b>{book.title}</Text>
        </Card.Header>
        <Card.Footer>
          <Row justify="flex-end" align="center">
            <Language>
              <Text b>Detected language</Text>
              <Spacer x="0.5" />
              <Text i color="#161616">{book.language}</Text>
            </Language>
            <Spacer x="1" />
            <Button
              auto
              size="sm"
              color="warning"
              onPress={() => setIsSelected((isSelected) => !isSelected)}
            >
              Read
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

const Language = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.li``;
