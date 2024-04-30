import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { baseApiUrl } from "../constants.js";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { id } = useParams();

  const authString = btoa("looloops:m6Lv 0wo3 DjWy gjxQ 2di8 vgHV");

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewTitle(data.title.rendered);
        setNewContent(data.content.rendered);
      });
  }, [id]);

  const handleSave = () => {
    const updatedPost = {
      title: newTitle,
      content: newContent,
    };

    fetch(`${baseApiUrl}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Non è stato possibile modificare l'articolo");
        }
        window.alert("Articolo modificato");
      })
      .catch((error) => {
        console.error("Non è stato possibile modificare l'articolo", error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title of the article</Form.Label>
          <Form.Control
            type="text"
            placeholder="write your title here"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="write your title here"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Pubblica
        </Button>
      </Form>
    </>
  );
};

export default EditPost;
