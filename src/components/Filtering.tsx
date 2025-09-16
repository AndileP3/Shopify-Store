import React, { useState, useEffect } from "react";
import styles from "../styles/Filtering.module.css";

const categoryImages: Record<string, string> = {
  All: "https://www.orega.com/hubfs/OregaMarkLane_Reception_WithPeople2-1.jpg",
  Woman: "https://www.orega.com/hubfs/OregaBroadGate_OfficeSpace_WithPeople.jpg",
  Man: "https://www.orega.com/hs-fs/hubfs/virtual-office-header-3.png?width=1200&height=500",
  Shirts: "https://www.orega.com/hs-fs/hubfs/Orega_GracechurchSt_Building.jpg?width=1200&height=500",
  Socks: "https://www.orega.com/hubfs/OregaMarkLane_Reception_WithPeople2-1.jpg",
};

const Filtering: React.FC = () => {
  const [selected, setSelected] = useState<string>("All");
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.filterWrapper} ${isFixed ? styles.fixed : ""}`}
      style={{ backgroundImage: `url(${categoryImages[selected]})` }}
    >
      <div className={styles.overlay}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {Object.keys(categoryImages).map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`${styles.tabButton} ${
                selected === category ? styles.active : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filtering;
