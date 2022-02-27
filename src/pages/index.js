import { Button, Card, Container, Grid } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ posts = [] }) {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No posts yet</h1>
            <div>
              <Button primary onClick={() => router.push("/posts/new")}>
                Create Post
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {posts &&
          posts.map((post) => (
            <Card key={post._id}>
              <Card.Content>
                <Card.Header>
                  <Link href={`/posts/${post._id}`}>
                    <a>{post.title}</a>
                  </Link>
                </Card.Header>
                <p>{post.content}</p>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="orange"
                  onClick={() => router.push(`/posts/${post._id}`)}
                >
                  View
                </Button>
                <Button
                  color="blue"
                  onClick={() => router.push(`/posts/${post._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}
