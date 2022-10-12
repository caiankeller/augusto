/* eslint-disable react/prop-types */
import { Badge, Row, Text } from '@nextui-org/react'
import React from 'react'

export default function GlosbeWords ({ translations }) {
  return (
        <>
            <Text h6 css={{ margin: 0, opacity: 0.8 }}>Glosbe words</Text>
            <Row>
                {translations.map((translation, key) => {
                  return <Badge color="warning" css={{ color: '#161616' }} isSquared key={key}>{translation}</Badge>
                })}
            </Row>
        </>
  )
}
