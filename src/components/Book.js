import { Card, Text, Button, Row, Spacer } from "@nextui-org/react";
import styled from "styled-components";
import Flag from "react-world-flags";

export default function Book({ book }) {
  return (
    <Container>
      <Card
        css={{
          marginTop: "1rem",
          backgroundColor: "#E8E8E8",
          color: "#161616",
        }}
      >
        <Card.Header>
          <Text b>{book.title}</Text>
        </Card.Header>
        <Card.Footer>
          <Row justify="flex-end">
            <Language>
              <Text b>Detected language</Text>
              <Spacer x="0.5" />
              <Flag
                code={book.language}
                height="16"
                fallback={<Text b>{book.language}</Text>}
              />
            </Language>
            <Spacer x="1" />
            <Button auto size="sm" color="warning">
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
