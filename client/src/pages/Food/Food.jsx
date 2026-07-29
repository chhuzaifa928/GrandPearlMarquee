import { useState } from "react";

import FoodHero from "../../components/Food/FoodHero";
import FoodCategories from "../../components/Food/FoodCategories";
import FoodGallery from "../../components/Food/FoodGallery";
import FoodBenefits from "../../components/Food/FoodBenefits";
import FoodCTA from "../../components/Food/FoodCTA";
function Food() {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <>

      <FoodHero />

      <FoodCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FoodGallery
        selectedCategory={selectedCategory}
      />
      <FoodBenefits />
      <FoodCTA />
    </>
  );
}

export default Food;