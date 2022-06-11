import { createContext, useReducer } from "react";

export const ReadingContext = createContext();

const initialState = { selected: false };

function ReadingReducer(state, action) {
  switch (action.type) {
    case "SELECT_BOOK":
      return action.payload;
    case "UNSELECT_BOOK":
      return { selected: false };
    default:
      return state;
  }
}

export function ReadingProvider({ children }) {
  const [reading, dispatch] = useReducer(ReadingReducer, initialState);

  return (
    <ReadingContext.Provider value={{ reading, dispatch }}>
      {children}
    </ReadingContext.Provider>
  );
}
