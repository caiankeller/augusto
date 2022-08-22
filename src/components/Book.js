import { Card, Text, Button, Row } from "@nextui-org/react";
import { useContext } from "react";
import { AugustoContext } from "../Augusto";
import styled from "styled-components";
import { FiEdit, FiTrash2, FiBookOpen } from "react-icons/fi";
import axios from "axios";

export default function Book({ book }) {
  const { dispatch } = useContext(AugustoContext);

  const deleteBook = () => {
    axios.delete(`http://localhost:2001/delete/${book.id}`).then(() => {
      dispatch({ type: "DELETE_BOOK", playload: book.id });
    })
  }

  const editBook = () => {
    axios.patch(`http://localhost:2001/language/${book.id}/portuguese`).then(() => {
      dispatch({ type: "EDIT_BOOK", playload: { book, language: "portuguese" } });
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
          <Text b h5>
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
                color="warning"
                style={{ marginRight: "0.5rem", color: "#161616" }}
                auto
                shadow
                icon={<FiEdit />}
                onPress={editBook}
              />
              <Button
                size="sm"
                color="success"
                css={{ color: "#161616" }}
                auto
                shadow
                onPress={() => { dispatch({ type: "SET_READING", playload: book }) }}
                icon={<FiBookOpen />}
              />
            </Row>
          </Row>
        </Card.Footer>
        <Row>
          <ProgressBar percentage={book.read}>
            <Text h6 style={{ marginRight: "1rem", zIndex: 1 }}> {book.read}% read</Text>
          </ProgressBar>
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

const ProgressBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: right;

  &:after {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background-image: linear-gradient(to right, 
      #F5A524 0%,
      #F5A524 ${props => props.percentage}%,
      #e8e8e8 ${props => props.percentage}%,
      #e8e8e8 100%);
    height: 100%;
  }
`;