/* eslint-disable react/prop-types */
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
          <Loading type="points" color="white" size="md">
            <Text h6 color="#efefef">
              Fetching some wonderful books
            </Text>
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
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  border-radius: 10px;
  gap: 1rem;
  flex-wrap: wrap;

  @media screen and (max-width: 700px) {
    li {
      width: 100%;
    }
  }

  @media screen and (min-width: 700px) {
    li {
      flex-grow: 1;
    }
  }
`
