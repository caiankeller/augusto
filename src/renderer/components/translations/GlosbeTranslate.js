/* eslint-disable react/prop-types */
import { Row, Text } from '@nextui-org/react'
import { BsTranslate } from 'react-icons/bs'
import React from 'react'

export default function GlosbeWords ({ translation }) {
  return (
    <>
      {/* <Link href=""> */}
      <Text h6 css={{ m: 0, opacity: 0.8 }}>
        <BsTranslate style={{ marginRight: '0.5rem' }} />
        Glosbe Translate
      </Text>
      {/* </Link> */}
      <Row align="center">
        <Text h6 css={{ m: '0 0.5rem 0 0' }}>
          {translation}
        </Text>
      </Row>
    </>
  )
}
