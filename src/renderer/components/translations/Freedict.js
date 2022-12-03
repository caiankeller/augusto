/* eslint-disable react/prop-types */
import axios from 'axios'
import { Row, Text } from '@nextui-org/react'
import { FiArrowRight, FiBook } from 'react-icons/fi'
import React from 'react'

export default function Freedict ({ translations }) {
  return (
    <>
      <Text h6 css={{ m: 0, opacity: 0.8 }}>
        <FiBook style={{ marginRight: '0.5rem' }} />
        Freedict dictionary entries
      </Text>
      {translations.map((entries, key) => (
        <div key={key}>
          <Row align="center">
            <FiArrowRight style={{ marginRight: '0.5rem' }} />
            <Text h6 transform="capitalize" css={{ m: 0 }}>
              {entries.word}
            </Text>
          </Row>
          {entries.definition.map((entry, index) => (
            <Row align="center" key={entry}>
              <Text h6 css={{ m: 0, mr: '0.5rem', opacity: 0.8 }}>
                {++index}.
              </Text>
              <Text h6 transform="capitalize" css={{ m: 0 }}>
                {entry}
              </Text>
            </Row>
          ))}
        </div>
      ))}
    </>
  )
}
