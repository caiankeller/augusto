import React, { createContext, useReducer } from 'react'

export const AugustoContext = createContext()

const initialState = {
  reading: undefined,
  user: {},
  library: []
}

function Augusto (state, action) {
  switch (action.type) {
    case 'SET_READING':
      return { ...state, reading: action.playload }
    case 'SET_APP':
      return {
        ...state,
        user: action.playload.user,
        library: action.playload.library
      }
    case 'ADD_BOOK':
      return { ...state, library: [...state.library, action.playload] }
    case 'DELETE_BOOK':
      return {
        ...state,
        library: state.library.filter((book) => book.id !== action.playload)
      }
    case 'EDIT_BOOK':
      return {
        ...state,
        library: state.library.map((book) => {
          if (book.id === action.playload.book.id) {
            book.language.long = action.playload.language
            return book
          }
          return book
        })
      }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        library: state.library.map((book) => {
          if (book.id === action.playload.book.id) {
            book.read = action.playload.page
            return book
          }
          return book
        })
      }
    default:
      return state
  }
}

// eslint-disable-next-line react/prop-types
export function AugustoProvider ({ children }) {
  const [augusto, dispatch] = useReducer(Augusto, initialState)

  return (
    <AugustoContext.Provider value={{ augusto, dispatch }}>
      {children}
    </AugustoContext.Provider>
  )
}
