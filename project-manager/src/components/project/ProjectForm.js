import React from "react";

import styles from "./ProjectForm.module.css";

function ProjectForm() {
  return (
    <form className={styles.form}>
      <div>
        <input type="text" placeholder="enter project name" />
      </div>
      <div>
        <input type="number" placeholder="enter the budget" />
      </div>
      <div>
        <select name="category_id">
          <option disabled>Select the category</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Create Project" />
      </div>
    </form>
  );
}

export default ProjectForm;
