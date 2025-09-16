import React, { useState } from "react";
import styles from "../styles/Filtering.module.css";

const categoryImages: Record<string, string> = {
  All: "https://www.orega.com/hubfs/OregaMarkLane_Reception_WithPeople2-1.jpg",
  Woman: "https://www.orega.com/hubfs/OregaBroadGate_OfficeSpace_WithPeople.jpg",
  Man: "https://www.orega.com/hs-fs/hubfs/virtual-office-header-3.png?width=350&height=300&name=virtual-office-header-3.png",
  Shirts: "https://www.orega.com/hs-fs/hubfs/Orega_GracechurchSt_Building.jpg?width=600&height=338&name=Orega_GracechurchSt_Building.jpg",
  Socks: "https://www.orega.com/hubfs/OregaMarkLane_Reception_WithPeople2-1.jpg",
};

const Filtering: React.FC = () => {
  const [selected, setSelected] = useState<string>("All");

  return (
    <div className={styles.filterWrapper}>
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

      {/* Image */}
      <div className={styles.imageContainer}>
        <img src={categoryImages[selected]} alt={selected} />
      </div>
    </div>
  );
};

export default Filtering;
