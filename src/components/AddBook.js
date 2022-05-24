import {
  Button,
  Spacer,
  Text,
  Loading,
  Card,
  Row,
  Divider,
} from "@nextui-org/react";
import fileSize from "filesize";
import { useRef, useState } from "react";
import {
  FiArrowRight,
  FiTrash2,
  FiUploadCloud,
  FiPlusCircle,
} from "react-icons/fi";
import styled from "styled-components";
import axios from "axios";

export default function AddBook() {
  const [filename, setFilename] = useState(false);
  const [filesize, setFilesize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ status: "" });
  const file = useRef(null);

  const fileChecker = (e) => {
    const file = e.target.files[0].name
    const extension = file.split(".").pop();
    const filename = file.slice(0, file.lastIndexOf('.'))

    if (extension !== "pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFilesize(fileSize(e.target.files[0].size));
    setFilename(filename);
  };

  const deleteFile = () => {
    setFilename(false);
    setFilesize(false);
    setResponse({ status: "" })
    file.current.value = "";
    console.log(file.current.files);
  };

  const sendFile = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/book",
        {
          file: file.current.files[0],
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((re) => {
        setResponse({ status: "success", message: re.data.message });
      })
      .catch((er) => {

        setResponse({ status: "error", message: er.response.data.message });
      })
      .then((e) => {
        setLoading(false)
      }
      );
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={sendFile}
    >
      <Container>
        <FileUploader ref={file} type="file" accept=".pdf" onChange={(e) => fileChecker(e)} />
        <Button
          color="primary"
          shadow
          auto
          icon={<FiUploadCloud />}
          style={{ fontWeight: "bold" }}
          onPress={() => file.current.click()}
          disabled={filename}
        >
          Add Book
        </Button>
        <Button
          color="primary"
          light
          auto
          style={{ marginLeft: "1rem", fontWeight: "bold" }}
          iconRight={<FiArrowRight />}
        >
          Vorwärts' Lybrary
        </Button>
      </Container>
      {filename && (
        <Card css={{ marginTop: "1rem", backgroundColor: "#161616" }}>
          <Card.Header>
            <Row justify="space-between" align="center">
              <Row align="center">
                <FiPlusCircle color="white" />
                <Spacer x="0.5" />
                <Text b transform="capitalize" color="white">
                  {filename}
                </Text>
              </Row>
              <Row justify="flex-end">
                <Text b color="white">
                  {filesize}
                </Text>
              </Row>
            </Row>
          </Card.Header>
          <Divider />
          <Card.Footer>
            <Row justify="flex-end">
              {!loading &&
                <>
                  <Button
                    color="error"
                    auto
                    size="sm"
                    onPress={() => {
                      deleteFile();
                    }}
                    iconRight={<FiTrash2 />}
                  />
                  <Spacer x="0.5" />
                </>
              }
              <Button
                disabled={response.status.length > 0 ? true : loading}
                color="primary"
                auto
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
                {typeof response.status !== "undefined" && response.message}
                {loading && "We are carrying your book"}
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </form>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const FileUploader = styled.input`
  display: none;
`;
