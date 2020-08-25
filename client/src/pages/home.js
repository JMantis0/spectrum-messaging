import React from "react";
import { Col, Row, Container } from "../components/Grid";
import CreatePostForm from "../components/CreatePostForm";
import PostsList from "../components/PostsList";

const Home = () => {
  return (
<Nav/>
    <Container>
      <Jumbotron />
      <Search />
      <Results />
    </Container>
  );
};

export default Home;
