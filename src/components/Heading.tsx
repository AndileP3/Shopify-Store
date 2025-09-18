import React, { useEffect, useState } from "react";
import styles from "../styles/Heading.module.css";
// import logo from "../assets/logo.png";
import { useSearch } from "./SearchContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const categories = ["All", "Women", "Men", "Shirts", "Socks"];

interface HeadingProps {
  selected: string;
  setSelected: (category: string) => void;
}

const Heading: React.FC<HeadingProps> = ({ selected, setSelected }) => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  // detect scroll -> change background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      {/* Logo */}
      <div className={styles.topRow}>
      <div
        className={styles.logo}
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <h3 className={styles.logoText}>VINTAGE</h3>
        {/* <img src={logo} alt="Vintage Store Logo" className={styles.logoImage} /> */}
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
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`${styles.tabButton} ${
              selected === cat ? styles.active : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    
    </header>
  );
};

export default Heading;
