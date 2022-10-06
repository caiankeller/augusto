import React, { useContext } from 'react'
import styled from 'styled-components'

import { AugustoContext } from './Augusto'

import Home from './components/Home'
import Reader from './components/Reader'

export function App () {
  const { augusto } = useContext(AugustoContext)

  return (
    <Container>
      {augusto.reading ? <Reader reading={augusto.reading} /> : <Home />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(90deg, #141414 21px, transparent 1%) center,
    linear-gradient(#141414 21px, transparent 1%) center, #c6c6c6;
  background-size: 22px 22px;
  user-select: none;
  padding: 1rem;
`
