import { useContext } from "react";
import styled from "styled-components";
import { Text } from "@nextui-org/react";
import { LibraryContext } from "../App";

import Book from "./Book";

export default function Books() {
  const { library } = useContext(LibraryContext);
  //TODO: create a loading feedback
  return (
    <Container>
      {typeof library !== "undefined" && (
        <>
          {library.length === 0 && (
            <Text b color="#E8E8E8">
              No books found.
            </Text>
          )}
          {library.map((book) => (
            <>
              <Book key={book.id} book={book} />
              <Book key={book.id} book={book} />
              <Book key={book.id} book={book} />
              <Book key={book.id} book={book} />
            </>
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 10px;
`;
