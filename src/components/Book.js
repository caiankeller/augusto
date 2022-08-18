import { Card, Text, Button, Row } from "@nextui-org/react";
import { useContext } from "react";
import { AugustoContext } from "../Augusto";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function Book({ book }) {
  const { dispatch } = useContext(AugustoContext);

  const deleteBook = () => {
    axios.delete(`http://localhost:2001/delete/${book.id}`).then(() => {
      dispatch({ type: "DELETE_BOOK", playload: book.id });
    })
  }

  const editBook = () => {
    axios.patch(`http://localhost:2001/language/${book._id}/portuguese`).then(() => {
      dispatch({ type: "EDIT_BOOK", playload: book });
    })
  }

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
            <Row>
              <Text i h6>
                Detected language {book.language.long}
              </Text>
            </Row>
            <Row justify="end">
              <Button
                size="sm"
                color="error"
                style={{ marginRight: "0.5rem", color: "#161616" }}
                auto
                shadow
                icon={<FiTrash2 />}
                onPress={deleteBook}
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
        <Row justify="flex-end" style={{ background: "#17C964" }}>
          <Text h6 style={{ marginRight: "1rem" }}> {book.read}% read</Text>
        </Row>
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
