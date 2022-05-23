import styled from "styled-components";
import { Text, Divider } from "@nextui-org/react";

import AddBook from "./components/AddBook";
import Header from "./components/Header";
import ListBooks from "./components/ListBooks";

export default function App() {
  return (
    <Container>
      <Box>
        <Header />
        <Augusto>
          <Text h2 color="primary">
            Wellcome to Augusto
          </Text>
          <AddBook style={{ alignSelf: "left" }} />
          <Divider css={{ marginTop: "1rem", backgroundColor: "#161616" }} />
          <Text h3 color="primary" css={{ marginTop: "1rem" }}>
            Books
          </Text>
          <ListBooks />
        </Augusto>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, white 21px, transparent 1%) center,
    linear-gradient(white 21px, transparent 1%) center, #141414;
  background-size: 22px 22px;
  user-select: none;
`;

const Box = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 1rem;
`;

const Augusto = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
