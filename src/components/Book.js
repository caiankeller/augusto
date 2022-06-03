import { Card, Text, Divider, Button, Row, Spacer } from "@nextui-org/react";
import styled from "styled-components";
import Flag from "react-world-flags";
import { FiBook } from "react-icons/fi";

export default function Book({ book }) {
  return (
    <Container>
      <Card color="primary">
        <Card.Header>
          <FiBook />
          <Spacer x="0.5" />
          <Text b color="white" transform="capitContainerze">
            {book.title}
          </Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ py: "0.5rem" }}>
        </Card.Body>
        <Card.Footer>
          <Row justify="flex-end" align="center">
            <Language>
              <Text b color="white">
                Detected language
              </Text>
              <Spacer x="0.5" />
              <Flag
                code={book.language}
                height="16"
                fallback={
                  <Text b color="white">
                    {book.language}
                  </Text>
                }
              />
            </Language>
            <Spacer x="1" />
            <Button
              size="sm"
              color="primary"
              style={{ fontWeight: "bold" }}
              css={{ backgroundColor: "white", color: "$primary" }}
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
