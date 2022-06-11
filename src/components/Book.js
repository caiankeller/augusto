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
          <Text b h6>
            {book.title}
          </Text>
        </Card.Header>
        <Card.Footer>
          <Row justify="flex-end" align="center">
            <Language>
              <Text b h6>
                Detected language
              </Text>
              <Spacer x="0.5" />
              <Text i b h6>
                {book.language}
              </Text>
            </Language>
            <Spacer x="0.8" />
            <Button
              size="sm"
              color="success"
              shadow
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

const Container = styled.li`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Language = styled.div`
  display: flex;
  align-items: center;
`;
