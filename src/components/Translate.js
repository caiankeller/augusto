import styled from "styled-components";

export default function Translate() {
  return <Container>Select text to translate</Container>;
}

const Container = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 1rem;
  left: 1rem;
  z-index: 1;
  border-radius: 10px 10px 0 0;
  border-top: 1px solid #161616;
`;
