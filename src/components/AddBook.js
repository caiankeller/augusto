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
import { useRef, useState, useContext } from "react";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import styled from "styled-components";
import axios from "axios";

import { LibraryContext } from "../App";

export default function AddBook() {
  const { library, dispatch } = useContext(LibraryContext);

  const [filename, setFilename] = useState(false);
  const [filesize, setFilesize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ status: "" });
  const file = useRef(null);

  const fileChecker = (e) => {
    const file = e.target.files[0].name;
    const extension = file.split(".").pop();
    const filename = file.slice(0, file.lastIndexOf("."));

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
    setResponse({ status: "" });
    file.current.value = "";
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
        dispatch({ type: "ADD_BOOK", payload: re.data });
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
          accept=".pdf"
          onChange={(e) => fileChecker(e)}
        />
        <Button
          color=""
          size="sm"
          auto
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
            <Text b>{filename}</Text>
          </Card.Header>
          <Card.Footer>
            <Row justify="flex-end">
              {!loading && (
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
              )}
              <Button
                disabled={response.status.length > 0 ? true : loading}
                color="warning"
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
                {loading && "We are caring your book"}
                {response.status === "success" && "Uploaded"}
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
