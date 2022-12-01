/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react'
import { Modal, Text, Row, Button, Loading } from '@nextui-org/react'
import { FiDownload } from 'react-icons/fi'
import { AugustoContext } from '../Augusto'
import axios from 'axios'

export default function AddDictionary ({
  visible,
  closeCallback,
  language,
  dictionaries
}) {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AugustoContext)

  useEffect(() => {
    axios
      .get(`http://localhost:2001/dictionaries/available/${language}`)
      .then((response) => {
        setResponse({ status: true, dictionaries: response.data })
      })
      .catch(({ response }) => {
        setResponse({ status: false, message: response.data.message })
      })
  }, [language])

  const addDictionary = (name) => {
    setLoading(true)
    axios
      .post('http://localhost:2001/download/dictionary', {
        dictionaryName: name,
        language
      })
      .then((response) => {
        dispatch({
          type: 'ADD_DICTIONARY',
          payload: {
            dictionary: response.data.dictionary,
            language: response.data.language
          }
        })
        setLoading(false)
      })
  }

  return (
    <Modal closeButton open={visible} onClose={closeCallback} blur noPadding>
      <Modal.Header css={{ px: '1rem' }}>
        <Row justify="flex-start">
          <Text h5 css={{ m: 0 }}>
            Download dictionaries ({language})
          </Text>
        </Row>
      </Modal.Header>
      <Modal.Body css={{ p: '1rem' }}>
        {response &&
          (response.status
            ? (
                response.dictionaries.map((dictionary) => (
              <Row
                key={dictionary.language}
                justify="space-between"
                align="center"
              >
                <div style={{ flexGrow: 1 }}>
                  <Text h6 transform="capitalize" css={{ m: 0 }}>
                    {dictionary.language}
                  </Text>
                  <Text h6 css={{ opacity: 0.8, m: 0 }}>
                    {dictionary.headwords} entries
                  </Text>
                </div>
                <Button
                  size="xs"
                  auto
                  css={{ bc: '#ed958b', color: '#141414' }}
                  disabled={
                    !!(loading ||
                    dictionaries?.[language]?.some(
                      (savedDictionary) =>
                        savedDictionary.language === dictionary.language
                    ))
                  }
                  onPress={() => addDictionary(dictionary.name)}
                >
                  {loading
                    ? (
                    <Loading type="spinner" size="sm" color="currentColor" />
                      )
                    : (
                    <>
                      Download <FiDownload style={{ marginLeft: '0.5rem' }} />
                    </>
                      )}
                </Button>
              </Row>
                ))
              )
            : (
            <Text h6 css={{ m: 0 }}>
              {response.message}
            </Text>
              ))}
      </Modal.Body>
    </Modal>
  )
}
