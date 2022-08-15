import { Card, Text, Button, Row, Spacer } from "@nextui-org/react";
import styled from "styled-components";

export default function Book({ book }) {

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
          <Row justify="space-between" align="center">
            <Text b h6>
              Detected language {book.language}
            </Text>
            <Spacer x="1" />
            <Button
              size="sm"
              color="success"
              shadow
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
