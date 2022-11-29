import React from "react";

import styles from "./Newproject.module.css";
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create the project and then add the service</p>
      <ProjectForm />
    </div>
  );
}
export default NewProject;
