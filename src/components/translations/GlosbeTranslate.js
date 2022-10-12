/* eslint-disable react/prop-types */
import { Link, Row, Text } from '@nextui-org/react'
import { FiArrowRight } from 'react-icons/fi'
import { BsTranslate } from 'react-icons/bs'
import React from 'react'

export default function GlosbeWords ({ translation }) {
  return (
    <>
      <Link href=""><Text h6 css={{ margin: 0, opacity: 0.8 }}><BsTranslate style={{ marginRight: '0.5rem' }} />Glosbe Translate</Text></Link>
      <Row align="center">
        <FiArrowRight style={{ marginRight: '0.5rem' }} /><Text h6 css={{ margin: 0 }}>{translation}</Text>
      </Row>
    </>
  )
}
