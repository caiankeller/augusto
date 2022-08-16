import { Card, Text, Button, Row, Spacer } from "@nextui-org/react";
import { useContext } from "react";
import { AugustoContext } from "../Augusto";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Book({ book }) {
  const { dispatch } = useContext(AugustoContext);

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
            <Row style={{ width: "60%" }}>
              <Text b h6>
                Detected language {book.language}
              </Text>
            </Row>
            <Spacer x="1" />
            <Row justify="end">
              <Button
                size="sm"
                color="error"
                style={{ marginRight: "0.5rem", color: "#161616" }}
                auto
                shadow
                icon={<FiTrash2 />}
              />
              <Button
                size="sm"
                style={{ marginRight: "0.5rem", background: "#F5A524", color: "#161616" }}
                auto
                shadow
                icon={<FiEdit />}
              />
              <Button
                size="sm"
                color="success"
                css={{ color: "#161616" }}
                auto
                shadow
                onPress={() => { dispatch({ type: "SET_READING", playload: book }) }}
              >
                Read
              </Button>
            </Row>
          </Row>
        </Card.Footer>
      </Card>
    </Container >
  );
}

const Container = styled.li`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
