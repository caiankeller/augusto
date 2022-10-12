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
  // so i used this because ref
  const [pages, setPages] = useState(reading.read)
  const page = useRef()
  const currentUrl = window.location.pathname

  const bookPath =
    `http://localhost:2001/Reader.html?book=${reading.title}&origin=${currentUrl}&cfi=${reading.read.cfi}`

  const focus = () => iframe.current.focus()
  useEffect(() => { focus() }, [])

  // updating current page into the ref page
  useEffect(() => { page.current = pages }, [pages])
  useEffect(() => { // sending the ref to state when it's unmounted
    return () =>
      dispatch({
        type: 'UPDATE_PROGRESS',
        playload: { book: reading, page: page.current }
      })
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'to_translate_word') {
        if (data.message.trim()) {
          // this mess let only the first character on uppercase
          setToTranslate(data.message.trim().toLowerCase().charAt(0).toUpperCase() + data.message.slice(1))
        }
      } else {
        axios
          .post('http://localhost:2001/progress', {
            progress: {
              cfi: data.message.cfi,
              percentage: data.message.percentage
            },
            id: reading.id
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
  }, []);

  const resetToTranslate = () => setToTranslate('')

  return (
    <Container>
      <Button
        color="error"
        css={{ marginLeft: 'calc(100% - 1.7rem)', position: 'absolute', zIndex: 1, color: '#161616' }}
        size="xs"
        auto
        onPress={() => { dispatch({ type: 'SET_READING', playload: null }) }}
      >
        <FiArrowLeft />
      </Button>
      <Card css={{ backgroundColor: '#efefef', height: '100%', margin: '0.5rem 0 0.5rem 0' }}>
        <Book src={bookPath} ref={iframe} onBlur={focus} />
      </Card>
      {toTranslate && (
        <Translations toTranslate={toTranslate} language={reading.language.short} resetToTranslate={resetToTranslate} />
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
