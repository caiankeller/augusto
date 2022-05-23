import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Book from "./Book";

export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/books")
        .then((data) => {
          console.log(data);
          setBooks(data.data);
        })
        .catch((err) => console.log(err))
        .then(() => setLoading(false));
    })();
  }, []);

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        typeof books !== "undefined" &&
        books.length !== 0 && (
          <Books>
            {books.map((book) => (
              <Book key={book.id} book={book}>
                {book.title}
              </Book>
            ))}
          </Books>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  margin-top: 1rem;
`;

const Books = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;
  }
`;
