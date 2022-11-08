/* eslint-disable react/prop-types */
import { Button, Card } from '@nextui-org/react'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import styled from 'styled-components'
import { AugustoContext } from '../Augusto'
import Translations from './Translations'

export default function Reader ({ reading }) {
  const { dispatch } = useContext(AugustoContext)
  const [toTranslate, setToTranslate] = useState('')
  const iframe = useRef()
  // quick explain, i am using this ref to store the last page visited
  // long explain, i only update page state in reducer while unmouting
  // because if i change it everytime it gonna rerender and rerender the iframe with the current
  // page, which is kinda annoying, i cant change it in the unmounting using usestate
  // so i used this because REF, refs can do anything
  const [pages, setPages] = useState(reading.read)
  const page = useRef()
  const currentUrl = window.location.pathname

  // book path for iframe
  const bookPath = `http://localhost:2001/Reader.html?book=${reading.title}&origin=${currentUrl}&cfi=${reading.read.cfi}`

  const focus = () => iframe.current.focus()
  useEffect(() => {
    focus()
  }, [])

  // updating current page into the ref page
  useEffect(() => {
    page.current = pages
  }, [pages])
  useEffect(() => {
    // sending the ref to global state when it's unmounted
    return () =>
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: { book: reading, page: page.current }
      })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const handler = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'to_translate_word') {
        if (data.message.trim()) {
          // this mess let only the first character on uppercase
          setToTranslate(data.message.trim().toLowerCase())
        }
      } else {
        axios
          .post('http://localhost:2001/progress/book', {
            progress: {
              cfi: data.message.cfi,
              percentage: data.message.percentage
            },
            bookIdentification: reading.id
          })
          .then(() => {
            setPages({
              cfi: data.message.cfi,
              percentage: data.message.percentage
            })
          })
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
    // eslint-disable-next-line
  }, [])

  // function that clearns toTranslate to when needed
  const resetToTranslate = () => setToTranslate('')

  return (
    <Container>
      <Button
        color="error"
        css={{
          ml: 'calc(100% - 2.5rem)',
          position: 'absolute',
          zIndex: 1
        }}
        size="sm"
        auto
        onPress={() => {
          dispatch({ type: 'SET_READING', payload: null })
        }}
      >
        <FiArrowLeft />
      </Button>
      <Card css={{ bc: '#efefef', h: '100%', m: '0.5rem 0 0.5rem 0' }}>
        <Book src={bookPath} ref={iframe} onBlur={focus} />
      </Card>
      {toTranslate && (
        <Translations
          toTranslate={toTranslate}
          language={reading.language.short}
          resetToTranslate={resetToTranslate}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 52px + 1rem);
  position: relative;
`

const Book = styled.iframe`
  height: 100%;
`
