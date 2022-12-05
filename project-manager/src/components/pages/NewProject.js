import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Newproject.module.css";
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    //  initialize project-manager and services
    project.projectmanager = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //redirect
        navigate("/projects", {
          state: { message: "Project created successfully" },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create the project and then add the service</p>
      <ProjectForm handleSubmit={createPost} btnText="Create project" />
    </div>
  );
}
export default NewProject;
