import React from "react";
import styles from "../styles/Filtering.module.css";

const categoryImages: Record<string, string> = {
  All: "https://img.ltwebstatic.com/v4/j/ccc/2025/09/12/39/1757645872cf64415e271709012de4d9b4339f2df8_thumbnail_912x.webp",
  Women: "https://img.ltwebstatic.com/v4/j/ccc/2025/09/11/1d/17575906513b876489c1a9ef16d83a4aee21da7415_thumbnail_912x.webp",
  Men: "https://img.ltwebstatic.com/v4/j/ccc/2025/09/12/cb/1757659769c272d3a53456f4ca3387fd8ee905a126_thumbnail_912x.webp",
  Shirts: "https://img.ltwebstatic.com/v4/j/ccc/2025/09/11/73/17575717270efee96a2fea8eb5502a3b3727710f82_thumbnail_912x.webp",
  Socks: "https://img.ltwebstatic.com/v4/j/ccc/2025/09/04/48/175696610292dee6a7a381f4888975e80bc8118f9b_thumbnail_912x.webp",
};

interface FilteringProps {
  selected: string;
}

const Filtering: React.FC<FilteringProps> = ({ selected }) => {
  return (
    <div
      className={styles.filterWrapper}
      style={{ backgroundImage: `url(${categoryImages[selected]})` }}
    >
      <div className={styles.overlay}></div>
    </div>
  );
};

export default Filtering;
