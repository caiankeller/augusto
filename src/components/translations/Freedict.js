/* eslint-disable react/prop-types */
import { Row, Badge, Text } from '@nextui-org/react'
import React from 'react'

export default function Freedict ({ translations }) {
  return (
        <>
            <Text h6 css={{ margin: 0, opacity: 0.8 }}>Freedict dictionary entries</Text>
            {translations.map((entries, key) =>
                <div key={key}>
                    <Text h6 css={{ margin: 0 }}>{entries.orth}</Text>
                    <Row>
                        {entries.sense.map((entry, key) =>
                            <Badge color="warning" css={{ color: '#161616' }} isSquared key={key}>{entry}</Badge>
                        )}
                    </Row>
                </div>
            )}
        </>
  )
}
