import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectFrom, setShowProjectFrom] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectFrom(!showProjectFrom);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectFrom ? "Edit Project" : "Fechar"}
              </button>
              {!showProjectFrom ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category:</span>
                    {project.category
                      ? project.category.name
                      : project.category}
                  </p>
                  <p>
                    <span>Total Budget:</span>R${project.budget}
                  </p>
                  <p>
                    <span>Total Budget Used:</span>R${project.projectmanager}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>form</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
