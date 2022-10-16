import React, { useContext, useState } from 'react'
import { Row, Text, Card, Popover, Button } from '@nextui-org/react'
import { FiType, FiHardDrive, FiList, FiUsers, FiTrash, FiPlus } from 'react-icons/fi'
import { AugustoContext } from '../Augusto'
import AddDictionary from './AddDictionary'

export default function dictionaries () {
  const [addDictionatyVisible, setAddDictionaryVisible] = useState(false)
  const { augusto } = useContext(AugustoContext)

  const closeAddDictionaryModal = () => {
    setAddDictionaryVisible(false)
  }

  return <Card isPressable css={{ backgroundColor: '#efefef', color: '#161616' }}>
        <Card.Header css={{ paddingBottom: 0 }}>
            {console.log(augusto)}
            <Text h5 css={{ marginBottom: 0 }}>Dictionaries- Freedict</Text>
        </Card.Header>
        <Card.Body css={{ paddingTop: 0 }}>
            {augusto.dictionaries[augusto.user.defaultLanguage]
              ? (augusto.dictionaries[augusto.user.defaultLanguage].map((dictionary) => {
                  return (<div key={dictionary.from}>
                        <Card.Divider css={{ marginTop: '1rem' }} />
                        <Row justify='space-between' wrap='wrap' css={{ marginTop: '0.5rem' }}>
                            <Row align='center' css={{ m: '0.5rem' }}>
                                <FiType style={{ marginRight: '0.5rem' }} /><Text h6 transform='capitalize' css={{ m: 0 }}>{dictionary.from}</Text>
                            </Row>
                            <Row align='center' css={{ m: '0.5rem' }}>
                                <FiList style={{ marginRight: '0.5rem' }} /><Text h6 css={{ m: 0 }}>{dictionary.length} entries</Text>
                            </Row>
                            <Row align='center' css={{ m: '0.5rem' }}>
                                <FiHardDrive style={{ marginRight: '0.5rem' }} /><Text h6 css={{ m: 0 }}>{dictionary.size}</Text>
                            </Row>
                            <Popover>
                                <Popover.Trigger>
                                    <Button color='warning' size='sm' auto css={{ color: '#161616' }} iconRight={<FiUsers />}>Mainteners</Button>
                                </Popover.Trigger>
                                <Popover.Content css={{ backgroundColor: '#161616' }}>
                                    <Text h6 css={{ p: '1rem', color: '#efefef' }}> This dictionary has been maintened and supported by all these people:  </Text>
                                </Popover.Content>
                            </Popover>
                            <Button color='error' size='sm' auto css={{ color: '#161616' }} iconRight={<FiTrash />}>Delete dictionary</Button>
                        </Row>
                    </ div>)
                }))
              : <Text h6 css={{ m: 0 }}>There not dictionaries for this language downloaded.</Text>}
        </Card.Body>
        <AddDictionary visible={addDictionatyVisible} language={augusto.user.defaultLanguage} closeCallback={closeAddDictionaryModal} dictionaries={augusto.dictionaries} />
        <Button color='warning' size='sm' auto css={{ color: '#161616' }} onPress={() => setAddDictionaryVisible(true)}
            iconRight={<FiPlus />}>Add Dictionary</Button>
    </Card>
}
