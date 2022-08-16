import { Button, Spacer, Text, Loading, Card, Row } from "@nextui-org/react";
import { useContext } from "react";
import { AugustoContext } from "../Augusto";
import fileSize from "filesize";
import { useRef, useState } from "react";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import styled from "styled-components";
import axios from "axios";

export default function AddBook() {

  const { dispatch } = useContext(AugustoContext);
  const [filename, setFilename] = useState(false);
  const [filesize, setFilesize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ status: "" });
  const file = useRef(null);

  const fileChecker = (e) => {
    const file = e.target.files[0].name;
    const extension = file.split(".").pop(); const filename = file.slice(0, file.lastIndexOf("."));


    if (extension !== "epub") return alert("Only PDF files are allowed")

    setFilesize(fileSize(e.target.files[0].size));
    setFilename(filename);
  };

  const deleteFile = () => {
    setFilename(false);
    setFilesize(false);
    setResponse({ status: "" });
    file.current.value = "";
  };

  const sendFile = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:2001/book",
        {
          file: file.current.files[0],
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((re) => {
        dispatch({ type: "ADD_BOOK", playload: re.data.book });
        setResponse({ status: "success", message: re.data.message });
      })
      .catch((er) => {
        setResponse({ status: "error", message: er.response.data.message });
      })
      .then((e) => {
        setLoading(false);
      });
  };

  return (
    <form method="post" encType="multipart/form-data" onSubmit={sendFile}>
      <Container>
        <FileUploader
          ref={file}
          type="file"
          accept=".epub"
          onChange={(e) => fileChecker(e)}
        />
        <Button
          color="neutral"
          size="sm"
          shadow
          iconRight={<FiUploadCloud />}
          onPress={() => file.current.click()}
          disabled={filename}
        >
          Add Book
        </Button>
      </Container>
      {filename && (
        <Card
          css={{
            marginTop: "1rem",
            backgroundColor: "#E8E8E8",
            color: "#161616",
          }}
        >
          <Card.Header>
            <Text b h6>
              {filename} - ({filesize})
            </Text>
          </Card.Header>
          <Card.Footer>
            <Row justify="flex-end">
              {!loading && (
                <>
                  <Button
                    css={{ color: "#161616" }}
                    color="error"
                    auto
                    shadow
                    size="sm"
                    onPress={() => {
                      deleteFile();
                    }}
                    iconRight={<FiTrash2 />}
                  />
                  <Spacer x="0.5" />
                </>
              )}
              <Button
                disabled={response.status.length > 0 ? true : loading}
                color="success"
                css={{ color: "#161616" }}
                auto
                shadow
                size="sm"
                type="submit"
                iconRight={
                  loading ? (
                    <Loading type="spinner" color="currentColor" />
                  ) : (
                    <FiUploadCloud />
                  )
                }
              >
                {loading && "Give us just a sec"}
                {response.status === "success" && "Uploaded"}
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </form>
  );
}

const Container = styled.div``;

const FileUploader = styled.input`
  display: none;
`;
