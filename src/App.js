import styled from "styled-components";
import { Text, Divider } from "@nextui-org/react";
import axios from "axios";
import { useContext, useEffect } from "react";

import AddBook from "./components/AddBook";
import Header from "./components/Header";
import Books from "./components/Books";
import Reader from "./components/Reader";

import { AugustoContext } from "./Augusto";

export function App() {
  const { augusto, dispatch } = useContext(AugustoContext);

  useEffect(() => {
    axios.get("http://localhost:2001/books").then(({ data }) => {
      dispatch({ type: "SET_APP", playload: data });
    })
  }, [dispatch])


  return (
    <Container>
      {!augusto.reading ?
        <>
          <Header />
          <Text h1 color="success">
            Welcome to Augusto
          </Text>
          <AddBook style={{ alignSelf: "left" }} />
          <Divider css={{ marginTop: "1rem", backgroundColor: "#C9C9C9" }} />
          <Text h3 color="success">
            Books
          </Text>
          <Books library={augusto.library} />
        </>
        :
        <Reader reading={augusto.reading} />
      }
    </Container >
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(90deg, #141414 21px, transparent 1%) center,
    linear-gradient(#141414 21px, transparent 1%) center, #C9C9C9;
  background-size: 22px 22px;
  user-select: none;
  padding: 1rem;
`;
