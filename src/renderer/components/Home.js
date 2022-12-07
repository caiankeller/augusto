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
          dispatch({ type: 'SET_APP', payload: data })
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
      <Text h1 color="#efefef">
        Welcome back!
      </Text>
      <AddBook />
      <Divider css={{ mt: '1rem', bc: '#efefef' }} />
      <Text h3 color="#efefef" css={{ m: 0 }}>
        Books
      </Text>
      <Books library={augusto.library} isLoading={loading} />
      <Card
        css={{
          bc: '#efefef',
          mt: 'auto'
        }}
      >
        <Card.Footer css={{ d: 'block' }}>
          <Row>
            <Text h6 css={{ m: 0 }}>
              «Die Grenzen meiner Sprache sind die Grenzen meiner Welt.»
            </Text>
          </Row>
          <Row>
            <Text h6 css={{ m: 0, opacity: 0.8 }}>
              Ludwig Wittgenstein.
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
