import React from "react";
import styles from "../styles/Heading.module.css";
import logo from "../assets/logo.png";

const Heading: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
 <div className={styles.logo}>
    <img src={logo} alt="Vintage Store Logo" className={styles.logoImage} />
  </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search Items, Brands, & Categories" />
      </div>

      {/* Cart */}
      <div className={styles.cart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2 8h12l2-8h4" />
        </svg>
      </div>
    </header>
  );
};

export default Heading;
