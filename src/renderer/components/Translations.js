/* eslint-disable react/prop-types */
import { Button, Card, Loading, Row, Text } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Freedict from './translations/Freedict'
import GlosbeWords from './translations/GlosbeWords'
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
      .get(`http://localhost:2001/translate/${toTranslate}/${language}`, {
        signal: controller.signal
      })
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
  }, [toTranslate])

  return (
    <Card
      css={{
        bc: '#efefef',
        mh: '250px',
        position: 'absolute',
        w: 'calc(100% - 1rem)',
        left: '0.5rem',
        right: 0,
        bottom: '0'
      }}
      isPressable
    >
      <Card.Header css={{ py: '0.5rem' }}>
        <Row justify="space-between" align="center">
          <Text h6 css={{ m: 0 }}>
            {toTranslate}
          </Text>
          <Button
            css={{ bc: '#ed958b', color: '#141414' }}
            size="xs"
            auto
            onPress={cancelRequest}
          >
            Close
          </Button>
        </Row>
      </Card.Header>
      <Card.Divider css={{ bc: '#14141480' }} />
      <Card.Body
        css={{
          py: '0.5rem'
        }}
      >
        {loading && (
          <Loading
            size="sm"
            type="points-opacity"
            color="currentColor"
            css={{ my: '0.5rem' }}
          />
        )}
        {!loading && (
          <div>
            {response.freedict && <Freedict translations={response.freedict} />}
            {response.glosbeWords && (
              <GlosbeWords translations={response.glosbeWords} />
            )}
            {response.glosbeTranslate && (
              <GlosbeTranslate translation={response.glosbeTranslate} />
            )}
            {!response.status && <Text h6>{response.message}</Text>}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
