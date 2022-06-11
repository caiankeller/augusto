import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Divider, Row, Button } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

import { ReadingContext } from "../Reading";

export default function Reader() {
  const { reading, dispatch } = useContext(ReadingContext);
  const [book, setBook] = useState("");

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/books", {
          params: {
            title: reading.book.title,
          },
        })
        .then((re) => {
          setBook(re.data);
        })
        .catch((er) => console.log(er));
    })();
  }, [reading]);

  return (
    <Box>
      {console.log(reading)}
      <Row justify="space-between" align="center">
        <Text b color="#161616">
          {reading.book.title}
        </Text>
        <Button
          color="error"
          size="sm"
          auto
          onPress={() => dispatch({ type: "UNSELECT_BOOK" })}
        >
          <FiArrowLeft />
        </Button>
      </Row>
      <Divider css={{ margin: "0.5rem 0", backgroundColor: "#161616" }} />
      <Text i color="#161616">
        {reading.book.language}
      </Text>
      <Book>
        <Text css={{ textAlign: "justify" }}>{book}</Text>
      </Book>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  padding: 1rem;
  background: #e8e8e8;
  border-radius: 0.5rem;
`;

const Book = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
