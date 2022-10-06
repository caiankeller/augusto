/* eslint-disable react/prop-types */
import { Button, Card, Loading, Row, Text } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowDownCircle } from 'react-icons/fi'
// import Freedict from './translations/Freedict'
// import GlosbeWords from './translations/glosbeWords'

export default function Translate ({ toTranslate, language, resetToTranslate }) {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)

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
          translations: response.response.data,
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
    if (toTranslate === '') return
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
        bottom: '-0.5rem'
      }}
    >
      <Card.Header css={{ paddingBottom: 0 }}>
        <Row justify="space-between" align="center">
          {loading
            ? <Loading size="xs" type="points-opacity" color="currentColor" />
            : <Text h5 css={{ width: '90%', margin: 0 }}> {toTranslate} </Text>}
          <Button size="sm" color="error" auto css={{ color: '#161616' }} onPress={cancelRequest}>
            <FiArrowDownCircle />
          </Button>
        </Row>
      </Card.Header>
      <Card.Body
        css={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {/* {!loading && (
          response.translations.map((options) => {
            return <>
              {options.name === 'freedict' && <Freedict translations={options.translations} />}
              {options.name === 'glosbe' && <GlosbeWords translations={options.translations} />}
            </>
          })
        )} */}
      </Card.Body>
    </Card >
  )
}
