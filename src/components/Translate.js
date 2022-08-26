import axios from "axios";
import { useState } from "react";
import { Row, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FiArrowRight } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import styled from "styled-components";

export default function Translate({ toTranslate, language, reset }) {
  const [translation, setTranslation] = useState("");
  const translate = async () => {
    await axios
      .get(`http://localhost:2001/translate/${toTranslate}/${language}`)
      .then((response) => {
        setTranslation({
          translations: response.data.translations,
          examples: response.data.examples,
        });
      });
  };

  return (
    <Container>
      <Row justify="space-between" align="center">
        <Text h5 style={{ width: "90%" }}>
          {toTranslate.trim() !== "" ? toTranslate : "Select text to translate"}
        </Text>
        <Button
          size="sm"
          color="warning"
          auto
          style={{ marginLeft: "0.5rem", color: "#161616" }}
          shadow
          disabled={toTranslate === "Select text to translate"}
          icon={<FiArrowRight />}
          onPress={translate}
        />
        {toTranslate !== "Select text to translate" && (
          <Button
            size="sm"
            color="error"
            auto
            style={{ marginLeft: "0.5rem", color: "#161616" }}
            shadow
            icon={<IoCloseCircleOutline />}
            onPress={reset}
          />
        )}
      </Row>
      <Row>
        {console.log(translation)}
        {translation &&
          (translation.translations[0] === "" ? (
            <Text i h6>
              No translations
            </Text>
          ) : (
            <Row wrap="wrap" gap="0.2">
              {translation.translations.map((translation, key) => {
                return (
                  <Text i h6 key={key}>
                    {++key}. {translation}.
                  </Text>
                );
              })}
            </Row>
          ))}
      </Row>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 1rem;
  border-bottom: 1px solid #161616;
  transition: all 1s;
`;
