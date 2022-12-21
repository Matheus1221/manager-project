import React from "react";

import { BsFillTrashFill } from "react-icons/bs";

import styles from "../project/ProjectCard.module.css";

function ServiceCard({ id, name, projectmanager, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, projectmanager);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Total cost:</span> R${projectmanager}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
