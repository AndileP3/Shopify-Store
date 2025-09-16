import React from "react";
import styles from "../styles/Heading.module.css";
import logo from "../assets/logo.png";
import { useSearch } from "./SearchContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; 

const Heading: React.FC = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // route to MultiProduct page
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Vintage Store Logo" className={styles.logoImage} />
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Items, Brands, & Categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Icons */}
        <div className={styles.icons}>
          <FaHeart className={styles.icon} title="Wishlist" />
          <FaShoppingCart className={styles.icon} title="Cart" />
        </div>
    </header>
  );
};

export default Heading;
