import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading";
import MultiProduct from "./components/Multi-Products";
import SingleProduct from "./components/Single-Product";
import { SearchProvider } from "./components/SearchContext";
import Filtering from "./components/Filtering";

export const App = () => {
  return (
    <>
    <SearchProvider>
      
      <Heading />
       <Filtering />
      <Routes>
        <Route path="/" element={<MultiProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>

      </SearchProvider>
    </>
  );
};
