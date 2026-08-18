import { useState } from "react";

import SEO from "../../components/SEO/SEO";

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
      <SEO
        title="Wedding & Event Food | Grand Pearl Marquee Rawalpindi"
        description="Explore wedding and event food menus at Grand Pearl Marquee in Rawalpindi, with food options for Mehndi, Barat, Walima and special events."
        keywords="wedding food Rawalpindi, wedding menu Rawalpindi, event catering Rawalpindi, Mehndi food, Barat food, Walima food, Grand Pearl Marquee food"
      />

      <div className="food-page">

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

      </div>
    </>
  );
}

export default Food;