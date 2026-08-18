import { useState } from "react";

import SEO from "../../components/SEO/SEO";

import DecorHero from "../../components/Decor/DecorHero";
import DecorCategories from "../../components/Decor/DecorCategories";
import DecorGallery from "../../components/Decor/DecorGallery";
import DecorBenefits from "../../components/Decor/DecorBenefits";
import DecorCTA from "../../components/Decor/DecorCTA";

function Decor() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <SEO
        title="Wedding & Event Decor | Grand Pearl Marquee Rawalpindi"
        description="Explore wedding and event décor options at Grand Pearl Marquee in Rawalpindi, including elegant setups for Mehndi, Barat, Walima, Nikkah, engagement and other events."
        keywords="wedding decor Rawalpindi, wedding decoration Rawalpindi, marquee decor Rawalpindi, Mehndi decor, Barat decor, Walima decor, Nikkah decor, Grand Pearl Marquee"
      />

      <div className="decor-page">
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
      </div>
    </>
  );
}

export default Decor;