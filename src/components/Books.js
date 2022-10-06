import React from 'react'
import { Text, Loading, Row } from '@nextui-org/react'
import styled from 'styled-components'
import Book from './Book'

export default function Books ({ library, isLoading: loading }) {
  return (
    <Container>
      {loading
        ? (
        <Row justify="center">
          <Loading type="points" color="warning" textColor="warning" size="md">
            Fetching some wonderful books
          </Loading>
        </Row>
          )
        : library.length === 0
          ? (
        <Text b color="#efefef">
          No books found.
        </Text>
            )
          : (
              library.map((book) => <Book key={book.id} book={book} />)
            )}
    </Container>
  )
}

const Container = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  border-radius: 10px;
`
