// import axios from "axios";
// import { useEffect } from "react";
import { Text } from "@nextui-org/react";
import styled from "styled-components";

export default function Translate({ toTranslate, language }) {
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:2001/translate/${toTranslate}/${language}`)
  //     .then((response) => {});
  // }, [toTranslate]);

  return (
    <Container>
      <Text h6>{toTranslate}</Text>
    </Container>
  );
}

const Container = styled.div`
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  border-bottom: 1px solid #161616;
`;
