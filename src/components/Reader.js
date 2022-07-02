import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Divider, Row, Button, Card } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

import { ReadingContext } from "../Reading";
import Word from "./Word";
import Translate from "./Translate";

export default function Reader() {
  const { reading, dispatch } = useContext(ReadingContext);
  const [book, setBook] = useState("");
  const [words, setWords] = useState([]);
  const [toTranslate, setToTranslate] = useState(
    "Select a word to translate..."
  );

  const handleToTranslate = (word) => {
    setToTranslate(word);
  };

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/books", {
          params: {
            title: reading.book.title,
          },
        })
        .then((re) => {
          setBook(re.data[0]);
          setWords(re.data[0].split(" "));
        })
        .catch((er) => console.log(er));
    })();
  }, [reading]);

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
            onPress={() => dispatch({ type: "UNSELECT_BOOK" })}
          >
            <FiArrowLeft />
          </Button>
        </Row>
        <Divider css={{ margin: "0.5rem 0", backgroundColor: "#161616" }} />
        <Text i b h6>
          {reading.book.language}
        </Text>
      </Header>
      <DummyHeader />
      <Translate toTranslate={toTranslate} />

      <Card
        css={{
          backgroundColor: "#e8e8e8",
          color: "#161616",
          marginTop: "1rem",
          height: "100%",
        }}
      >
        <Card.Body>
          <Pre css={{ textAlign: "justify" }}>
            {words.map((word, key) => {
              return (
                <Word
                  key={key}
                  word={word}
                  toTranslate={toTranslate}
                  handleToTranslate={handleToTranslate}
                />
              );
            })}
          </Pre>
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

const Pre = styled.pre`
  white-space: pre-wrap;
  margin: 0;
  padding: 0;
`;

const DummyHeader = styled.div`
  height: 102px;
`;
