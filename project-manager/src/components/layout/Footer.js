import React from "react";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaGithub />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Matheus Felix: Project-Manager</span>&copy; 2022
      </p>
    </footer>
  );
}
export default Footer;
