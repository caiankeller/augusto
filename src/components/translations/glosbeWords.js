/* eslint-disable react/prop-types */
import { Row, Text } from '@nextui-org/react'
import React from 'react'

export default function GlosbeWords ({ translations }) {
  return (
    <>
      <Text h6 css={{ m: 0, opacity: 0.8 }}>Glosbe words</Text>
      <div>
        {translations.map((translation, key) =>
          <Row align="center" key={key}>
            <Text h6 css={{ m: 0, mr: '0.5rem', opacity: 0.8 }}>{++key}.</Text><Text h6 transform="capitalize" css={{ m: 0 }}>{translation}</Text>
          </Row>
        )}
      </div>
    </>
  )
}
