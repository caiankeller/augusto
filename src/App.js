import { createContext, useReducer, useEffect, useContext } from "react";
import styled from "styled-components";
import { Text, Divider } from "@nextui-org/react";
import axios from "axios";

import AddBook from "./components/AddBook";
import Header from "./components/Header";
import Books from "./components/Books";
import Reader from "./components/Reader";

import { ReadingContext } from "./Reading";

export const LibraryContext = createContext();

function LibraryReducer(state, action) {
  var payload = action.payload;
  switch (action.type) {
    case "SET_LIBRARY":
      return [...payload];
    case "ADD_BOOK":
      return [...state, payload];
    case "DELETE_BOOK":
      return state.filter((book) => book.id !== payload);
    default:
      return state;
  }
}

export function App() {
  const [library, dispatch] = useReducer(LibraryReducer);
  const { reading } = useContext(ReadingContext);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/books")
        .then((re) => {
          dispatch({ type: "SET_LIBRARY", payload: re.data });
        })
        .catch((er) => console.log(er));
    })();
  }, []);

  return (
    <Container>
      {!reading.selected ? (
        <LibraryContext.Provider value={{ library, dispatch }}>
          <Header />
          <Text h1 color="success">
            Welcome to Augusto
          </Text>
          <AddBook style={{ alignSelf: "left" }} />
          <Divider css={{ marginTop: "1rem", backgroundColor: "#C9C9C9" }} />
          <Text h3 color="success">
            Books
          </Text>
          <Books />
        </LibraryContext.Provider>
      ) : (
        <Reader />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(90deg, #141414 21px, transparent 1%) center,
    linear-gradient(#141414 21px, transparent 1%) center, white;
  background-size: 22px 22px;
  user-select: none;
  padding: 1rem;
`;
