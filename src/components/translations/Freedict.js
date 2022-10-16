/* eslint-disable react/prop-types */
import { Row, Text, Link } from '@nextui-org/react'
import { FiArrowRight, FiBook } from 'react-icons/fi'
import React from 'react'

export default function Freedict ({ translations }) {
  return (
        <>{console.log(translations)}
            <Link href=""><Text h6 css={{ margin: 0, opacity: 0.8 }}><FiBook style={{ marginRight: '0.5rem' }} />Freedict dictionary entries</Text></Link>
            {translations.map((entries, key) =>
                <div key={key}>
                    <Row align="center">
                        <FiArrowRight style={{ marginRight: '0.5rem' }} /><Text h6 transform="capitalize" css={{ margin: 0 }}>{entries.word}</Text>
                    </Row>
                    {entries.definition.map((entry, index) =>
                        <Row align="center" key={entry}>
                            <Text h6 css={{ margin: 0, marginRight: '0.5rem', opacity: 0.8 }}>{++index}.</Text>
                            <Text h6 transform="capitalize" css={{ margin: 0 }}>{entry}</Text>
                        </Row>
                    )}
                </div>
            )}
        </>
  )
}
