import React, { useContext, useState } from 'react'
import { Row, Text, Card, Popover, Button } from '@nextui-org/react'
import {
  FiType,
  FiHardDrive,
  FiList,
  FiUsers,
  FiTrash,
  FiPlus
} from 'react-icons/fi'
import { AugustoContext } from '../Augusto'
import AddDictionary from './AddDictionary'

export default function dictionaries () {
  const [addDictionatyVisible, setAddDictionaryVisible] = useState(false)
  const { augusto, dispatch } = useContext(AugustoContext)

  const deleteBook = (toLanguage, index) => {
    dispatch({
      type: 'DELETE_DICTIONARY',
      payload: {
        toLanguage,
        index
      }
    })
  }

  const closeAddDictionaryModal = () => {
    setAddDictionaryVisible(false)
  }

  return (
    <>
      <Card isPressable css={{ bc: '#efefef', color: '#161616' }}>
        <Card.Header css={{ pb: 0 }}>
          <Text h5 css={{ mb: 0 }}>
            Dictionaries- Freedict
          </Text>
        </Card.Header>
        <Card.Body
          css={{
            pt: 0,
            h: '400px',
            ov: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {augusto.dictionaries[augusto.user.defaultLanguage] &&
          augusto.dictionaries[augusto.user.defaultLanguage].length !== 0
            ? (
                augusto.dictionaries[augusto.user.defaultLanguage].map(
                  (dictionary, index) => {
                    return (
                  <div key={index}>
                    <Card.Divider css={{ mt: '1rem' }} />
                    <Row
                      justify="space-between"
                      wrap="wrap"
                      css={{ mt: '0.5rem' }}
                    >
                      <Row align="center" css={{ m: '0.5rem' }}>
                        <FiType style={{ marginRight: '0.5rem' }} />
                        <Text h6 transform="capitalize" css={{ m: 0 }}>
                          {dictionary.from}
                        </Text>
                      </Row>
                      <Row align="center" css={{ m: '0.5rem' }}>
                        <FiList style={{ marginRight: '0.5rem' }} />
                        <Text h6 css={{ m: 0 }}>
                          {dictionary.length} entries
                        </Text>
                      </Row>
                      <Row align="center" css={{ m: '0.5rem' }}>
                        <FiHardDrive style={{ marginRight: '0.5rem' }} />
                        <Text h6 css={{ m: 0 }}>
                          {dictionary.size}
                        </Text>
                      </Row>
                      <Row justify="space-between" css={{ gap: '1rem' }} wrap="wrap">
                        <Popover>
                          <Popover.Trigger>
                            <Button
                              color="warning"
                              size="sm"
                              auto
                              css={{ color: '#161616' }}
                              iconRight={<FiUsers />}
                            >
                              Mainteners
                            </Button>
                          </Popover.Trigger>
                          <Popover.Content css={{ bc: '#161616' }}>
                            <Text h6 css={{ p: '1rem', color: '#efefef' }}>
                              This dictionary has been maintened and supported
                              by all these people:
                            </Text>
                          </Popover.Content>
                        </Popover>
                        <Button
                          color="error"
                          size="sm"
                          auto
                          css={{ color: '#161616' }}
                          onPress={() => deleteBook(dictionary.language, index)}
                          iconRight={<FiTrash />}
                        >
                          Delete dictionary
                        </Button>
                      </Row>
                    </Row>
                  </div>
                    )
                  }
                )
              )
            : (
            <Text h6 css={{ m: 0 }}>
              There not dictionaries for this language downloaded.
            </Text>
              )}
        </Card.Body>
        <AddDictionary
          visible={addDictionatyVisible}
          language={augusto.user.defaultLanguage}
          closeCallback={closeAddDictionaryModal}
          dictionaries={augusto.dictionaries}
        />
        <Button
          color="warning"
          size="sm"
          auto
          css={{ color: '#161616', mt: '1rem' }}
          onPress={() => setAddDictionaryVisible(true)}
          iconRight={<FiPlus />}
        >
          Add Dictionary
        </Button>
      </Card>
    </>
  )
}
