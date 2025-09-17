import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading";
import MultiProduct from "./components/Multi-Products";
import SingleProduct from "./components/Single-Product";
import { SearchProvider } from "./components/SearchContext";
import Filtering from "./components/Filtering";
import { useState } from "react";

export const App = () => {
  const [selected, setSelected] = useState("All");

  return (
    <SearchProvider>
      {/* Header always visible */}
      <Heading selected={selected} setSelected={setSelected} />

      <Routes>
        {/* Filtering only appears on MultiProduct */}
        <Route
          path="/"
          element={
            <>
              <Filtering selected={selected} />
              <MultiProduct />
            </>
          }
        />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </SearchProvider>
  );
};
