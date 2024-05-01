import { useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Button, Form } from "react-bootstrap";

const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authString = btoa("looloops:m6Lv 0wo3 DjWy gjxQ 2di8 vgHV");
    fetch(`${baseApiUrl}/posts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${authString}` },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        status: "publish",
      }),
    })
      .then((res) => {
        console.log("Here's the response", res);
        if (res.ok) {
          window.alert("New post added!");
          setNewTitle("");
          setNewContent("");
        } else {
          throw new Error("Network response was not ok");
        }
      })

      .catch((error) => {
        console.error("Failed to add the new post:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
  );
};

export default PostForm;
