import React, { useContext, useState } from 'react'
import { Row, Text, Card, Popover, Button } from '@nextui-org/react'
import {
  FiType,
  FiHardDrive,
  FiList,
  FiUsers,
  FiTrash2,
  FiPlus
} from 'react-icons/fi'
import { AugustoContext } from '../Augusto'
import AddDictionary from './AddDictionary'
import axios from 'axios'

export default function dictionaries () {
  const [addDictionatyVisible, setAddDictionaryVisible] = useState(false)
  const { augusto, dispatch } = useContext(AugustoContext)

  const deleteBook = (language, dictionaryName) => {
    axios
      .delete(
        `http://localhost:2001/delete/dictionary/${dictionaryName}/${language}`
      )
      .then(() =>
        dispatch({
          type: 'DELETE_DICTIONARY',
          payload: {
            language,
            dictionaryName
          }
        })
      )
  }

  const closeAddDictionaryModal = () => {
    setAddDictionaryVisible(false)
  }

  return (
    <Card isPressable css={{ bc: '#efefef', color: '#141414' }}>
      <Card.Header css={{ pb: 0 }}>
        <Text h5 css={{ mb: 0 }}>
          Dictionaries- Freedict
        </Text>
      </Card.Header>
      <Card.Body
        css={{
          pt: 0,
          mh: '300px',
          ov: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {augusto.dictionaries?.[augusto.user.language]?.length > 0
          ? (
              augusto.dictionaries[augusto.user.language].map(
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
                        {dictionary.language}
                      </Text>
                    </Row>
                    <Row align="center" css={{ m: '0.5rem' }}>
                      <FiList style={{ marginRight: '0.5rem' }} />
                      <Text h6 css={{ m: 0 }}>
                        {dictionary.headwords} entries
                      </Text>
                    </Row>
                    <Row align="center" css={{ m: '0.5rem' }}>
                      <FiHardDrive style={{ marginRight: '0.5rem' }} />
                      <Text h6 css={{ m: 0 }}>
                        {dictionary.size}
                      </Text>
                    </Row>
                    <Row
                      justify="space-between"
                      align="center"
                      css={{ gap: '1rem', mt: '1rem' }}
                      wrap="wrap"
                    >
                      <Popover>
                        <Popover.Trigger>
                          <Button
                            color="neutral"
                            size="xs"
                            auto
                            css={{ bc: '#141414', color: '#efefef' }}
                            iconRight={<FiUsers />}
                          >
                            Mainteners
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content css={{ bc: '#ed958b' }}>
                          <Text h6 css={{ p: '1rem', m: 0, color: '#141414' }}>
                            This dictionary has been maintened and supported by
                            all these people:{' '}
                            {dictionary.maintainers.map(
                              (maintainer, index) =>
                                `${maintainer}${
                                  index + 2 === dictionary.maintainers.length // i
                                    ? ' and ' // hate
                                    : index + 1 === // this
                                      dictionary.maintainers.length // big
                                    ? '.' // confusing
                                    : ', ' // mess
                                }`
                            )}
                          </Text>
                        </Popover.Content>
                      </Popover>
                      <Button
                        size="sm"
                        css={{ bc: '#ed958b', color: '#141414' }}
                        auto
                        onPress={() =>
                          deleteBook(augusto.user.language, dictionary.name)
                        }
                        iconRight={<FiTrash2 />}
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
        language={augusto.user.language}
        closeCallback={closeAddDictionaryModal}
        dictionaries={augusto.dictionaries}
      />
      <Card.Footer>
        <Button
          color="success"
          size="sm"
          auto
          css={{ bc: '#141414', color: '#efefef' }}
          onPress={() => setAddDictionaryVisible(true)}
          iconRight={<FiPlus />}
        >
          Add Dictionary
        </Button>
      </Card.Footer>
    </Card>
  )
}
