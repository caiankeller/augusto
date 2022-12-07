/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Button, Row, Text, Modal, Card, Badge } from '@nextui-org/react'
import Dictionaries from './Dictionaries'
import { FiSettings } from 'react-icons/fi'
import axios from 'axios'
import { AugustoContext } from '../Augusto'

export default function Header () {
  const { augusto, dispatch } = useContext(AugustoContext)
  const [visible, setVisible] = useState(false)

  const changeUserlanguage = async (language) => {
    axios.patch(`http://localhost:2001/language/user/${language}`).then(() => {
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

  const openSourceTools = [
    {
      name: 'NextUI',
      url: 'https://nextui.org/'
    },
    {
      name: 'Electron',
      url: 'https://www.electronjs.org/'
    },
    {
      name: 'Electron Forge',
      url: 'https://www.electronforge.io/'
    },
    {
      name: 'Chromium',
      url: 'https://www.chromium.org/chromium-projects/'
    },
    {
      name: 'React',
      url: 'https://reactjs.org/'
    },
    {
      name: 'Node',
      url: 'https://nodejs.org/'
    },
    {
      name: 'epubjs',
      url: 'http://epubjs.org/documentation/0.3/'
    },
    {
      name: 'and a lot more.',
      url: ''
    }
  ]

  return (
    <>
      <Row justify="space-between" align="center">
        <Text h4 color="#efefef" css={{ m: 0 }}>
          Augusto
          <Badge
            isSquared
            disableOutline
            size="sm"
            css={{
              mx: '0.5rem',
              bc: '#ed958b',
              color: '#141414',
              position: 'absolute',
              top: '-1.5rem'
            }}
          >
            Preview
          </Badge>
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
        css={{ bc: '#141414', outline: '1920px solid #efefef', mw: '700px' }}
        width="95%"
      >
        <Modal.Header css={{ px: '1rem' }}>
          <Row justify="flex-start">
            <Text h3 color="#efefef" css={{ m: 0 }}>
              Settings
            </Text>
          </Row>
        </Modal.Header>
        <Modal.Body css={{ p: '1rem' }}>
          <Row justify="space-between">
            <Text h4 color="#efefef" css={{ m: 0 }}>
              Language ({augusto.user.language})
            </Text>
          </Row>
          <Row>
            <Button.Group vertical size="sm" css={{ m: '0 1rem 0 0' }}>
              {languageOptions.map((language) => (
                <Button
                  key={language}
                  disabled={language === augusto.user.language}
                  onPress={() => changeUserlanguage(language)}
                  css={{ bc: '#ed958b', bcolor: '#141414' }}
                >
                  <Text h6 transform="capitalize" css={{ m: 0 }}>
                    {language}
                  </Text>
                </Button>
              ))}
            </Button.Group>
            <Dictionaries />
          </Row>
          <Text h4 color="#efefef" css={{ my: '1rem' }}>
            Acknowledge
          </Text>
          <Card isPressable css={{ bc: '#efefef', color: '#141414' }}>
            <Card.Header css={{ pb: 0 }}>
              <Text h5 css={{ m: 0 }}>
                Augusto would not be possible without several open source tools
                that I want and must mention:
              </Text>
            </Card.Header>
            <Card.Body css={{ py: 0 }}>
              {openSourceTools.map((tool) => {
                return (
                  <Text h6 css={{ m: 0, opacity: 0.9 }} key={tool.name}>
                    {tool.name}
                  </Text>
                )
              })}
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
              <Row>
                <Text h5 css={{ m: 0 }}>
                  Translations and definitions are provide by FreeDict and
                  Glosbe.
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  )
}
