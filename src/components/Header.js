import React, { useState } from 'react'
import { Button, Row, Text, Modal } from '@nextui-org/react'
import { FiSettings } from 'react-icons/fi'

export default function Header () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Row justify="space-between" align="center">
        <Text h4 color="warning" css={{ margin: 0 }}>
          Augusto
        </Text>
        <Button
          color="neutral"
          size="sm"
          auto
          iconRight={<FiSettings />}
          onPress={() => setVisible(true)}
        />
      </Row>
      <Modal
        closeButton
        open={visible}
        onClose={() => setVisible(false)}
        fullScreen
        css={{ background: '#161616' }}
      >
        <Modal.Header>
          <Row justify="flex-start">
            <Text h4 color="#E8E8E8">
              Settings
            </Text>
          </Row>
        </Modal.Header>
        <Modal.Body autoMargin>
          <Text h5 color="warning">
            This area still on work
          </Text>
        </Modal.Body>
      </Modal>
    </>
  )
}
