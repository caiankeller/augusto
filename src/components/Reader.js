import { Button, Card, Divider, Row, Text } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import styled from "styled-components";
import { useContext, useState } from "react";
import { AugustoContext } from "../Augusto";

import Translate from "./Translate";

export default function Reader({ reading }) {
  const { dispatch } = useContext(AugustoContext);
  const [toTranslate, setToTranslate] = useState("Select text to translate");

  const bookPath = `http://localhost:2001/Reader.html?book=${reading.title}`;

  return (
    <Container css={{ color: "#161616" }}>
      <Header>
        <Row justify="space-between" align="center">
          <Text b h6>
            {reading.title}
          </Text>
          <Button
            color="error"
            css={{ color: "#161616" }}
            size="sm"
            shadow
            auto
            onPress={() => {
              dispatch({ type: "SET_READING", playload: null });
            }}
          >
            <FiArrowLeft />
          </Button>
        </Row>
        <Divider css={{ margin: "0.5rem 0", backgroundColor: "#161616" }} />
        <Text i h6>
          {reading.language.long}
        </Text>
      </Header>
      <Card
        css={{
          backgroundColor: "#c6c6c6",
          height: "100%",
          margin: "0.5rem 0",
        }}
      >
        <Book src={bookPath} />
      </Card>
      <Translate toTranslate={toTranslate} language={reading.language.long} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 96.3vh;
`;

const Header = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  border-bottom: 1px solid #161616;
`;

const Book = styled.iframe`
  height: 100%;
`;
