import { Text } from "@nextui-org/react";
import styled from "styled-components";

export default function Translate() {
  return <Container><Text h6>Select text to translate</Text></Container>;
}

const Container = styled.div`
background-color: #e8e8e8;
border-radius: 10px;
padding: 1rem;
border-bottom: 1px solid #161616;
`;
