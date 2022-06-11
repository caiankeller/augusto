import { Card } from "@nextui-org/react";
import styled from "styled-components";

export default function Translate({ toTranslate }) {
  return (
    <Container css={{ backgroundColor: "#E8E8E8", color: "#161616" }}>
      {toTranslate}
    </Container>
  );
}

const Container = styled(Card)`
  padding: 1rem;
  margin-top: 1rem;
`;
