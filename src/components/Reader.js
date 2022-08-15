import { Button, Card, Divider, Row, Text } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import styled from "styled-components";

import Translate from "./Translate";

export default function Reader() {

  const reading = {
    book: {
      title: "alice",
      language: "german"
    }
  }

  return (
    <Container css={{ color: "#161616" }}>
      <Header>
        <Row justify="space-between" align="center">
          <Text b h6>
            {reading.book.title}
          </Text>
          <Button
            color="error"
            size="sm"
            shadow
            auto
          >
            <FiArrowLeft />
          </Button>
        </Row>
        <Divider css={{ margin: "0.5rem 0", backgroundColor: "#161616" }} />
        <Text i b h6>
          {reading.book.language}
        </Text>
      </Header>
      <Translate />

      <Card
        css={{
          backgroundColor: "#e8e8e8",
          color: "#161616",
          marginTop: "1rem",
          height: "100%",
        }}
      >
        <Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  position: relative;
`;

const Header = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  position: fixed;
  top: 0;
  right: 1rem;
  left: 1rem;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  border-bottom: 1px solid #161616;
`;
