import React, { createContext, useReducer } from 'react'

export const AugustoContext = createContext()

const initialState = {
  reading: undefined,
  user: {},
  library: [],
  dictionaries: {}
}

const Augusto = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'SET_READING':
      return { ...state, reading: payload }
    case 'SET_APP':
      return {
        ...state,
        user: payload.user,
        library: payload.library,
        dictionaries: payload.dictionaries
      }
    case 'ADD_BOOK':
      return { ...state, library: [...state.library, payload] }
    case 'DELETE_BOOK':
      return {
        ...state,
        library: state.library.filter((book) => book.id !== payload)
      }
    case 'EDIT_BOOK':
      return {
        ...state,
        library: state.library.map((book) => {
          if (book.id === payload.book.id) {
            book.language.long = payload.language
            return book
          }
          return book
        })
      }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        library: state.library.map((book) => {
          if (book.id === payload.book.id) {
            book.read = payload.page
            return book
          }
          return book
        })
      }
    case 'UPDATE_USER_LANGUAGE':
      return {
        ...state,
        user: { defaultLanguage: payload }
      }
    case 'ADD_DICTIONARY':
      return {
        ...state,
        dictionaries: {
          ...state.dictionaries,
          [payload.language]: [
            ...state.dictionaries?.[payload.language],
            { ...action.payload.dictionary }
          ]
        }
      }
    case 'DELETE_DICTIONARY':
      return {
        ...state,
        dictionaries: {
          [payload.toLanguage]: [payload.toLanguage].filter((dictionary) =>
            console.log(dictionary)
          )
        }
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
