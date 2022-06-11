import styled from "styled-components";

export default function Word({ word, handleToTranslate }) {
  return <Container onClick={() => handleToTranslate(word)}>{word} </Container>;
}

const Container = styled.span``;
