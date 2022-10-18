import React, { useContext, useRef, useState } from 'react'
import { Button, Spacer, Loading, Card, Row, Input } from '@nextui-org/react'
import { AugustoContext } from '../Augusto'
import { FiTrash2, FiUploadCloud } from 'react-icons/fi'
import styled from 'styled-components'
import axios from 'axios'

export default function AddBook () {
  const { dispatch } = useContext(AugustoContext)
  const [filename, setFilename] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({ status: '' })
  const file = useRef(null)

  const fileChecker = (e) => {
    const file = e.target.files[0].name
    const extension = file.split('.').pop()
    const filename = file.slice(0, file.lastIndexOf('.'))

    if (extension !== 'epub') return alert('Only EPUB files are allowed')

    setFilename(filename)
  }

  const deleteFile = () => {
    setFilename('')
    setResponse({ status: '' })
    file.current.value = ''
  }

  // this just update the file name
  const convertFile = () => {
    let newTitle = ''
    if (!filename) {
      newTitle = file.current.files[0].name.slice(
        0,
        file.current.files[0].name.lastIndexOf('.')
      )
    } else newTitle = filename

    const blob = file.current.files[0].slice(
      0,
      file.current.files[0].size,
      'application/epub+zip'
    )
    const newFile = new File([blob], `${newTitle}.epub`, {
      type: 'application/epub+zip'
    })
    return newFile
  }

  const sendFile = (e) => {
    e.preventDefault()
    const newFile = convertFile()
    setLoading(true)
    axios
      .post(
        'http://localhost:2001/book',
        {
          file: newFile
        },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .then((re) => {
        dispatch({ type: 'ADD_BOOK', payload: re.data.book })
        setResponse({ status: 'warning', message: re.data.message })
      })
      .catch((er) => {
        setResponse({ status: 'error', message: er.response.data.message })
      })
      .then((e) => {
        setLoading(false)
      })
  }

  return (
    <form method="post" encType="multipart/form-data" onSubmit={sendFile}>
      <Container>
        <Row justify="space-between" align="center">
          <Button
            onPress={() => file.current.click()}
            disabled={filename}
            iconRight={<FiUploadCloud />}
            color="neutral"
            size="sm"
          >
            Add Book
          </Button>
        </Row>
        <FileUploader
          ref={file}
          type="file"
          accept=".epub"
          onChange={(e) => fileChecker(e)}
        />
      </Container>
      {file.current?.files[0] && (
        <Card
          css={{
            bc: '#efefef',
            color: '#161616',
            mt: '1rem'
          }}
        >
          <Card.Header css={{ p: '0.5rem' }}>
            <Input
              width="100%"
              fullWidth
              size="sm"
              clearable
              css={{ mt: '1.5rem' }}
              labelPlaceholder={file.current.files[0].name}
              onChange={(e) => {
                setFilename(e.target.value)
              }}
              value={filename}
            />
          </Card.Header>
          <Card.Footer css={{ p: '0.5rem' }}>
            <Row justify="flex-end">
              <Button
                css={{ color: '#161616' }}
                icon={<FiTrash2 />}
                color="error"
                size="sm"
                auto
                disabled={loading}
                onPress={() => {
                  deleteFile()
                }}
              >
                {response.status && response.message}
              </Button>
              <Spacer x="0.5" />
              <Button
                disabled={response.status ? true : loading}
                css={{ color: '#161616' }}
                color="success"
                type="submit"
                size="sm"
                auto
                icon={
                  loading
                    ? (
                    <Loading type="spinner" color="currentColor" />
                      )
                    : (
                    <FiUploadCloud />
                      )
                }
              >
                {loading && 'Give us just a sec'}
                {response.status === 'success' && 'Uploaded'}
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </form>
  )
}

const Container = styled.div``

const FileUploader = styled.input`
  display: none;
`
