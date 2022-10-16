/* eslint-disable react/prop-types */
import { Button, Card, Loading, Row, Text } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowDownCircle, FiArrowLeft } from 'react-icons/fi'
import Freedict from './translations/Freedict'
import GlosbeWords from './translations/glosbeWords'
import GlosbeTranslate from './translations/GlosbeTranslate'

export default function Translate ({ toTranslate, language, resetToTranslate }) {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(true)

  const controller = new AbortController()
  const cancelRequest = () => {
    resetToTranslate()
    setResponse()
    controller.abort()
    setLoading(false)
  }

  const translate = async () => {
    setLoading(true)
    await axios
      .get(`http://localhost:2001/translate/${toTranslate}/${language}`, { signal: controller.signal })
      .then((response) => {
        setResponse({
          ...response.data,
          status: true
        })
      })
      .catch(({ response }) => {
        setResponse({
          status: false,
          message: response.data.message
        })
      })
      .then(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (toTranslate.trim() === '') return
    translate()
    // eslint-disable-next-line
  }, [toTranslate]);

  return (
    <Card
      css={{
        backgroundColor: '#efefef',
        maxHeight: '250px',
        position: 'absolute',
        width: 'calc(100% - 1rem)',
        left: '0.5rem',
        right: 0,
        bottom: '0'
      }}
      isPressable
    >
      <Card.Header css={{ paddingBottom: 0 }}>
        <Row justify="space-between" align="center">
          <Row align="center"><FiArrowLeft style={{ marginRight: '0.5rem' }} /><Text h6 css={{ margin: 0 }}>{toTranslate} </Text></Row>
          <Button size="xs" color="error" auto css={{ color: '#161616' }} onPress={cancelRequest}>
            <FiArrowDownCircle />
          </Button>
        </Row>
      </Card.Header>
      <Card.Body
        css={{
          paddingTop: '0',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {loading && <Loading size="sm" type="points-opacity" color="currentColor">Fetching</Loading>}
        {!loading && (
          <>
            {response.freedict && <Freedict translations={response.freedict} />}
            {response.glosbeWords && <GlosbeWords translations={response.glosbeWords} />}
            {response.glosbeTranslate && <GlosbeTranslate translation={response.glosbeTranslate} />}
            {!response.status && <Text h6>{response.message}</Text>}
          </>
        )}
      </Card.Body>
    </Card >
  )
}
