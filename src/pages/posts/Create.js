import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const Create = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({});

  const { title, content } = newPost;

  const { push } = useRouter();

  const handleSubmit = (e) => {};

  const handleChange = (e) => {};

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
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    autoFocus
                  />
                  <Form.TextArea
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
