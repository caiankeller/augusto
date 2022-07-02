import styled from "styled-components";

export default function Word({ word, toTranslate, handleToTranslate }) {
  return (
    <Container onClick={() => handleToTranslate(word)}>
      {word === toTranslate ? <mark>{word}</mark> : word}{" "}
    </Container>
  );
}

const Container = styled.span``;
