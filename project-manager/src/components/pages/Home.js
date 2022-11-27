import React from "react";

import styles from "./Home.module.css";
import porc from "../../img/savings.svg";
import Linkbutton from "../layout/Linkbutton";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Welcome to<span>Project-Manager</span>
      </h1>
      <p>Manage your projects right now!</p>
      <Linkbutton to="/newproject" text="Create Project" />
      <img src={porc} alt="Project-Manager" />
    </section>
  );
}
export default Home;
