/* eslint-disable react/prop-types */
import axios from 'axios'
import { Row, Text } from '@nextui-org/react'
import React from 'react'

export default function GlosbeWords ({ translation }) {
  return (
    <>
      <Text
        h6
        css={{ m: 0, opacity: 0.8 }}
        onClick={() =>
          axios.get('http://localhost:2001/external/translate.glosbe')
        }
      >
        <img
          src="https://glosbe.com/assets/favicon/favicon-16x16.png"
          style={{ marginRight: '0.5rem' }}
        />
        Glosbe Translate
      </Text>
      <Row align="center">
        <Text h6 css={{ m: '0 0.5rem 0 0' }}>
          {translation}
        </Text>
      </Row>
    </>
  )
}
