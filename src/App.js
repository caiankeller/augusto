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
        <Box>
          <Header />
          <Augusto>
            <Text h2 color="#F6AD37">
              Welcome to Augusto
            </Text>
            <LibraryContext.Provider value={{ library, dispatch }}>
              <AddBook style={{ alignSelf: "left" }} />
              <Divider
                css={{ marginTop: "0.5rem", backgroundColor: "#C9C9C9" }}
              />
              <Text h3 color="#F6AD37">
                Books
              </Text>
              <Books />
            </LibraryContext.Provider>
          </Augusto>
        </Box>
      ) : (
        <Reader />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #141414 21px, transparent 1%) center,
    linear-gradient(#141414 21px, transparent 1%) center, white;
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
