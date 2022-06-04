import { useContext } from "react";
import styled from "styled-components";
import { LibraryContext } from "../App";

import Book from "./Book";

export default function Books() {
  const { library } = useContext(LibraryContext);
  //TODO: create a loading feedback
  return (
    <Container>
      {typeof library !== "undefined" &&
        library.map((book) => <Book key={book.id} book={book} />)}
    </Container>
  );
}

const Container = styled.ul`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;
  }
`;
