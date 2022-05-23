import styled from "styled-components";
import { Button } from "@nextui-org/react";
import { FiSettings } from "react-icons/fi";

export default function Header() {
  return (
    <Container>
      <Button
        auto
        light
        css={{ color: "#0072F5" }}
        icon={<FiSettings  />}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: #fff;
`;
