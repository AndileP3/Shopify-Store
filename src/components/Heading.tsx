import React from "react";
import styles from "../styles/Heading.module.css";

const Heading: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7h20L12 2z" />
          <path d="M2 7v7c0 5 5 9 10 9s10-4 10-9V7" />
        </svg>
        <span>Vintage Store</span>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search products..." />
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
