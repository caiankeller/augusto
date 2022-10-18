/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Button, Row, Text, Modal } from '@nextui-org/react'
import Dictionaries from './Dictionaries'
import { FiSettings } from 'react-icons/fi'
import axios from 'axios'
import { AugustoContext } from '../Augusto'

export default function Header ({ defaultLanguage }) {
  const { dispatch } = useContext(AugustoContext)
  const [visible, setVisible] = useState(false)

  const changeUserDefaultLanguage = async (language) => {
    axios.patch(`http://localhost:2001/language/${language}`).then(() => {
      dispatch({ type: 'UPDATE_USER_LANGUAGE', payload: language })
    })
  }

  const languageOptions = [
    'english',
    'portuguese',
    'spanish',
    'french',
    'italian',
    'dutch',
    'german'
  ]

  return (
    <>
      <Row justify="space-between" align="center">
        <Text h4 color="primary" css={{ m: 0 }}>
          Augusto
        </Text>
        <Button
          color="neutral"
          size="sm"
          auto
          iconRight={<FiSettings />}
          onPress={() => setVisible(true)}
        />
      </Row>
      <Modal
        closeButton
        blur
        noPadding
        open={visible}
        onClose={() => setVisible(false)}
        css={{ bc: '#161616' }}
        width="90%"
      >
        <Modal.Header css={{ px: '1rem' }}>
          <Row justify="flex-start">
            <Text h3 color="#E8E8E8" css={{ m: 0 }}>
              Settings
            </Text>
          </Row>
        </Modal.Header>
        <Modal.Body css={{ p: '1rem' }}>
          <Row justify="space-between">
            <Text h4 color="primary" css={{ m: 0 }}>
              Language ({defaultLanguage})
            </Text>
          </Row>
          <Row>
            <Dictionaries />
            <Button.Group
              color="primary"
              vertical
              size="sm"
              css={{ m: '0 0 0 1rem' }}
            >
              {languageOptions.map((language) => (
                <Button
                  key={language}
                  disabled={language === defaultLanguage}
                  onPress={() => changeUserDefaultLanguage(language)}
                  css={{ color: '#161616' }}
                >
                  {language}
                </Button>
              ))}
            </Button.Group>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}
