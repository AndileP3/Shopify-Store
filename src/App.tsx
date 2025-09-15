import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading";
import MultiProduct from "./components/Multi-Products";
import SingleProduct from "./components/Single-Product";

export const App = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MultiProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
};
