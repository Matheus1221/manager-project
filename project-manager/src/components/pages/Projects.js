import React from "react";
import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import Container from "../layout/Container";
import Linkbutton from "../layout/Linkbutton";

import styles from "./Projects.module.css";

function Projects() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My projects</h1>
        <Linkbutton to="/newproject" text="Create Project" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        <p>Projects...</p>
      </Container>
    </div>
  );
}
export default Projects;
