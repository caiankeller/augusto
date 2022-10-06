import React, { useContext, useEffect, useState } from 'react'
import { Text, Divider, Card, Row } from '@nextui-org/react'
import axios from 'axios'
import AddBook from './AddBook'
import Header from './Header'
import Books from './Books'
import { AugustoContext } from '../Augusto'

export default function Home () {
  const { augusto, dispatch } = useContext(AugustoContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetching = async () => {
      setLoading(true)
      await axios
        .get('http://localhost:2001/books')
        .then(({ data }) => {
          dispatch({ type: 'SET_APP', playload: data })
        })
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          setTimeout(() => fetching(), 500)
        })
    }
    augusto.library.length === 0 && fetching()
  }, [dispatch])

  return (
    <>
      <Header />
      <Text h1 color="warning">
        Welcome back!
      </Text>
      <AddBook />
      <Divider css={{ marginTop: '1rem', backgroundColor: '#efefef' }} />
      <Text h3 color="warning" css={{ margin: 0 }}>
        Books
      </Text>
      <Books library={augusto.library} isLoading={loading} />
      <Card
        isPressable
        css={{
          backgroundColor: '#efefef',
          marginTop: 'auto'
        }}
      >
        <Card.Footer>
          <Row wrap="wrap">
            <Text h6 css={{ margin: 0, width: '100%' }}>
              `Minha pátria é a língua portuguesa [...].`
            </Text>
            <Text h6 i css={{ margin: 0, opacity: 0.8 }}>
              Fernando Pessoa.
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
