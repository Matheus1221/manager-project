import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectFrom, setShowProjectFrom] = useState(false);
  const [showServiceFrom, setShowServiceFrom] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

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

  function editPost(project) {
    setMessage("");
    //budget validation
    if (project.budget < project.cost) {
      setMessage("The budget cannot be less than the cost of the project.");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectFrom(false);
        setMessage("Project edited successfully");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectFrom(!showProjectFrom);
  }
  function toggleServiceForm() {
    setShowServiceFrom(!showServiceFrom);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
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
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Finish editing"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add an service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceFrom ? "Add services" : "Close"}
              </button>
              <div className={styles.project_info}>
                {showServiceFrom && <div>Formulary of services</div>}
              </div>
            </div>
            <h2>services</h2>
            <Container customClass="start">
              <p>itens from service</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
