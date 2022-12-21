import React from "react";

import { parse, v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
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
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [id]);

  function editPost(project) {
    setMessage("");
    //budget validation
    if (project.projectmanager > project.budget) {
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

  function createService(project) {
    setMessage("");
    //last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceProjectmanager = lastService.projectmanager;
    const newProjectmanager =
      parseFloat(project.projectmanager) +
      parseFloat(lastServiceProjectmanager);

    //max value validation

    if (newProjectmanager > parseFloat(project.budget)) {
      setMessage("budget exceeded, check the value");
      setType("error");
      project.services.pop();
      return false;
    }
    project.projectmanager = newProjectmanager;

    //update project

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        //exibir services
        setShowServiceFrom(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, projectmanager) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.projectmanager =
      parseFloat(projectUpdated.projectmanager) - parseFloat(projectmanager);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("service removed successfully");
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
                {showServiceFrom && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add Service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>services</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    projectmanager={service.projectmanager}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>don't has services</p>}
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
