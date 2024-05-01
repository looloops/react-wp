import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FloatingLabel, Form, Modal, Button } from "react-bootstrap";
import { baseApiUrl } from "../constants.js";

const EditPost = ({ postId, onClose }) => {
  const [post, setPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { id } = useParams();

  const authString = btoa("looloops:m6Lv 0wo3 DjWy gjxQ 2di8 vgHV");

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewTitle(data?.title?.rendered || "");
        setNewContent(data?.content?.rendered || "");
      })
      .catch((error) => {
        console.error("Error retrieving post data:", error);
      });
  }, [postId]);

  const handleSave = () => {
    const updatedPost = {
      title: newTitle,
      content: newContent,
    };

    fetch(`${baseApiUrl}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update post");
        }
        window.alert("Post updated");
        onClose();
      })
      .catch((error) => {
        console.error("Unable to update post", error);
      });
  };

  return (
    post && (
      <Modal show={true} onHide={onClose} className="w-100 h-100 pe-0">
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="formTitle" label="Edit title">
            <Form.Control
              type="text"
              placeholder="write your title here"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId="formContent" label="Edit post content">
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn_clock p-0" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default EditPost;
