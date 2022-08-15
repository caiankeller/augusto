import { createContext, useReducer } from "react";

export const AugustoContext = createContext();

const initialState = {};

function Augusto(state, action) {
}

export function AugustoProvider({ children }) {
  const [augusto, dispatch] = useReducer(Augusto, initialState);

  return (
    <AugustoContext.Provider value={{ augusto, dispatch }}>
      {children}
    </AugustoContext.Provider>
  );
}
