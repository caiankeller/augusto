import { Button, Card, Divider, Row, Text } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import styled from "styled-components";
import { useContext, useRef } from "react";
import { AugustoContext } from "../Augusto";
import { ReactEpubViewer } from "react-epub-viewer";

import Translate from "./Translate";

export default function Reader({ reading }) {
  const { dispatch } = useContext(AugustoContext);
  const viewerRef = useRef(null);

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
            onPress={() => { dispatch({ type: "SET_READING", playload: null }) }}
          >
            <FiArrowLeft />
          </Button>
        </Row>
        <Divider css={{ margin: "0.5rem 0", backgroundColor: "#161616" }} />
        <Text i b h6>
          {reading.language}
        </Text>
      </Header>
      <Card
        css={{
          position: "relative",
          width: "100%",
          margin: "0.5rem 0",
        }}
      >
        <ReactEpubViewer
          url={""}
          ref={viewerRef}
        />
      </Card>
      <Translate />

    </Container >
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Header = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  border-bottom: 1px solid #161616;
`;
