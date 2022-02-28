import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Grid, Card } from "semantic-ui-react";
import Error from "next/error";

const Post = ({ post, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();

  const deletePost = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deletePost();
    await push("/");
    close();
  };

  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Card centered>
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Description>{post.content}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Button color="red" onClick={open} loading={isDeleting}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        content="Are you sure to delete this post?"
        header="Please Confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (res.status === 200) {
    const post = await res.json();
    return {
      props: {
        post,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid ID",
      },
    },
  };
}

export default Post;
