import { createContext, useReducer, useEffect } from "react";
import styled from "styled-components";
import { Text, Divider } from "@nextui-org/react";
import axios from "axios";

import AddBook from "./components/AddBook";
import Header from "./components/Header";
import Books from "./components/Books";

export const LibraryContext = createContext();

function LibraryReducer(state, action) {
  switch (action.type) {
    case "SET_LIBRARY":
      var payload = action.payload;
      return [...payload]
    case "ADD_BOOK":
      var payload = action.payload;
      return [...state, payload]
    case "DELETE_BOOK":
      var payload = action.payload;
      return state.filter((book) => book.id !== payload);
    default:
      return state;
  }
}

export function App() {
  const [library, dispatch] = useReducer(LibraryReducer);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/books")
        .then((re) => {
          dispatch({ type: "SET_LIBRARY", payload: re.data });
        })
        .catch((er) => console.log(er))
    })();
  }, []);

  return (
    <Container>
      <Box>
        <Header />
        <Augusto>
          <Text h2 color="primary">
            Welcome to Augusto
          </Text>
          <LibraryContext.Provider value={{ library, dispatch }}>
            <AddBook style={{ alignSelf: "left" }} />
            <Divider css={{ marginTop: "1rem", backgroundColor: "#161616" }} />
            <Text h3 color="primary" css={{ marginTop: "1rem" }}>
              Books
            </Text>
            <Books />
          </LibraryContext.Provider>
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
