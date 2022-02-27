import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const Create = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const { title, content } = newPost;
  const { push } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!content) {
      errors.content = "Content is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    await createPost();
    await push("/");
  };

  const createPost = async () => {
    try {
      await fetch(" http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80hv" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>Create Post</h1>
            <div>
              {isSubmit ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    error={
                      errors.title ? { content: "Title cannot be empty" } : null
                    }
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    autoFocus
                  />
                  <Form.TextArea
                  error={
                    errors.content ? { content: "Content cannot be empty" } : null
                  }
                    placeholder="Content"
                    name="content"
                    onChange={handleChange}
                    value={content}
                  />
                  <Button type="submit" primary>
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Create;
