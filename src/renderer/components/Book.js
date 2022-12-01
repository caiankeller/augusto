/* eslint-disable react/prop-types */
import { Card, Dropdown, Row, Text } from '@nextui-org/react'
import axios from 'axios'
import React, { useContext } from 'react'
import { FiBookOpen, FiEdit, FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'
import { AugustoContext } from '../Augusto'

export default function Book ({ book }) {
  const { dispatch } = useContext(AugustoContext)

  const deleteBook = () => {
    axios.delete(`http://localhost:2001/delete/book/${book.id}`).then(() => {
      dispatch({ type: 'DELETE_BOOK', payload: book.id })
    })
  }

  const editBook = () => {
    axios
      .patch(`http://localhost:2001/language/${book.id}/portuguese`)
      .then(() => {
        dispatch({
          type: 'EDIT_BOOK',
          payload: { book, language: '{language}' }
        })
      })
  }

  return (
    <Container>
      <Card isPressable css={{ bc: '#efefef', color: '#141414' }}>
        <Card.Header css={{ pb: 0 }}>
          <Row justify="space-between" align="center">
            <Text h5 transform="capitalize" css={{ m: 0 }}>
              {book.title}
            </Text>
            <Dropdown placement="right">
              <Dropdown.Button
                size="sm"
                css={{ bc: '#ed958b', color: '#141414' }}
              >
                Book
              </Dropdown.Button>
              <Dropdown.Menu
                disabledKeys={['edit']}
                css={{ bc: '#efefef', border: '1px solid #141414' }}
                onAction={(type) => {
                  type === 'open' &&
                    dispatch({ type: 'SET_READING', payload: book })
                  type === 'edit' && editBook()
                  type === 'delete' && deleteBook()
                }}
              >
                <Dropdown.Item
                  key="open"
                  css={{ bc: '#ed958b', color: '#141414' }}
                  icon={<FiBookOpen />}
                >
                  Open
                </Dropdown.Item>
                <Dropdown.Item key="edit" icon={<FiEdit />}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item key="delete" icon={<FiTrash2 />}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Card.Header>
        <Card.Body css={{ py: 0 }}>
          <Text i h6 css={{ m: '0 0.5rem 0 0' }}>
            Detected language {book.language.long}
          </Text>
        </Card.Body>
        <Row css={{ mt: '1rem' }}>
          <ProgressBar percentage={book.read.percentage}>
            <Text h6 css={{ m: '0 1rem 0 0', zIndex: 1 }}>
              {book.read.percentage}% read
            </Text>
          </ProgressBar>
        </Row>
      </Card>
    </Container>
  )
}

const Container = styled.li`
  margin: 0;
`

const ProgressBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  text-align: right;
  &:after {
    content: '';
    border-radius: 7px 7px 0 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: ${(props) => props.percentage}%;
    background-color: #ed958b;
    height: 100%;
  }
`
