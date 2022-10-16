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
      dispatch({ type: 'UPDATE_USER_LANGUAGE', playload: language })
    })
  }

  const languageOptions = [
    'english', 'portuguese', 'spanish', 'french', 'italian', 'dutch', 'german'
  ]

  return (
    <>
      <Row justify="space-between" align="center">
        <Text h4 color="warning" css={{ margin: 0 }}>
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
        open={visible}
        onClose={() => setVisible(false)}
        fullScreen
        css={{ background: '#161616' }}
      >
        <Modal.Header>
          <Row justify="flex-start">
            <Text h3 color="#E8E8E8">
              Settings
            </Text>
          </Row>
        </Modal.Header>
        <Modal.Body autoMargin>
          <Row justify="space-between">
            <div style={{ width: '100%' }}>
              <Text h4 color="warning">Language ({defaultLanguage})</Text>
              <Dictionaries />
            </div>
            <Button.Group color="warning" vertical size='sm'>
              {languageOptions.map(language =>
                <Button key={language} disabled={language === defaultLanguage}
                  onPress={() => changeUserDefaultLanguage(language)} css={{ color: '#161616' }}>{language}</Button>
              )}
            </Button.Group>
          </Row>
        </Modal.Body>
      </Modal >
    </>
  )
}
