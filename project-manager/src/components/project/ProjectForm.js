import React from "react";

import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ btnText }) {
  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Project Name"
        name="name"
        placeholder="enter project name"
      />
      <Input
        type="number"
        text="Project Budget"
        name="budget"
        placeholder="enter total budget"
      />
      <Select name="category_id" text="Select the category" />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
