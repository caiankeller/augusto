import React, { useContext, useRef, useState } from 'react'
import { Button, Loading, Card, Row, Input, Text } from '@nextui-org/react'
import { AugustoContext } from '../Augusto'
import { FiTrash2, FiUploadCloud } from 'react-icons/fi'
import styled from 'styled-components'
import axios from 'axios'

export default function AddBook () {
  const defaultBookLanguage = 'english'
  const { dispatch } = useContext(AugustoContext)
  const [filename, setFilename] = useState('')
  const [bookLanguage, setBookLanguage] = useState(defaultBookLanguage)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({ status: '' })
  const file = useRef(null)

  const languageOptions = [
    'english',
    'portuguese',
    'spanish',
    'french',
    'italian',
    'dutch',
    'german',
    'korean'
  ]

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
    setBookLanguage(defaultBookLanguage)
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
          file: newFile,
          bookLanguage
        },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .then((re) => {
        dispatch({ type: 'ADD_BOOK', payload: re.data.book })
        setResponse({ status: 'primary', message: re.data.message })
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
            css={{ bc: '#ed958b', color: '#141414' }}
            size="sm"
            auto
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
            bc: '#ed958b',
            mt: '1rem'
          }}
        >
          <Card.Body css={{ p: '0.5rem', d: 'block' }}>
            <Input
              width="100%"
              fullWidth
              size="sm"
              disabled={!loading ? response.status : loading}
              css={{
                '*:not(label)': { bc: '#141414', color: '#efefef' },
                '*': { fontWeight: 'bold' }
              }}
              label="Book's title"
              placeholder={file.current.files[0].name}
              onChange={(e) => {
                setFilename(e.target.value)
              }}
              value={filename}
            />
            <Button.Group
              size="sm"
              color="neutral"
              css={{ m: '1rem 0 0 0', flexWrap: 'wrap' }}
            >
              {languageOptions.map((language) => (
                <Button
                  key={language}
                  disabled={language === bookLanguage}
                  onPress={() => setBookLanguage(language)}
                  css={{
                    '&:disabled': { bc: '#141414' }
                  }}
                >
                  <Text
                    h6
                    transform="capitalize"
                    css={{
                      m: 0,
                      color: `${
                        language === bookLanguage ? '#efefef' : '#141414'
                      }`
                    }}
                  >
                    {language}
                  </Text>
                </Button>
              ))}
            </Button.Group>
          </Card.Body>
          <Card.Footer css={{ p: '0.5rem' }}>
            <Row justify="flex-end">
              <Button
                icon={<FiTrash2 />}
                css={{ ml: '0.5rem', bc: '#141414', color: '#efefef' }}
                size="xs"
                auto
                disabled={loading}
                onPress={() => {
                  deleteFile()
                }}
              >
                {response.status && response.message}
              </Button>
              <Button
                disabled={response.status ? true : loading}
                css={{ ml: '0.5rem', bc: '#141414', color: '#efefef' }}
                color="primary"
                type="submit"
                size="xs"
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
