import { useState } from "react";

import DecorHero from "../../components/Decor/DecorHero";
import DecorCategories from "../../components/Decor/DecorCategories";
import DecorGallery from "../../components/Decor/DecorGallery";
import DecorBenefits from "../../components/Decor/DecorBenefits";
import DecorCTA from "../../components/Decor/DecorCTA";


function Decor() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
  <DecorHero />

  <DecorCategories
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
  />

  <DecorGallery
    selectedCategory={selectedCategory}
  />

  <DecorBenefits />
  <DecorCTA />
</>
  );
}

export default Decor;