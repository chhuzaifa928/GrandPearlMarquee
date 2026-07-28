import Hero from "../../components/Hero/Hero";
import AboutPreview from "../../components/Venue/AboutPreview";
import Stats from "../../components/Home/Stats";
import WhyChooseUs from "../../components/Venue/WhyChooseUs";
import EventCategories from "../../components/Home/EventCategories";
import DecorPreview from "../../components/Home/DecorPreview";
import FoodPreview from "../../components/Home/FoodPreview";


function Home() {
  return (
   <>
  <Hero />
  <AboutPreview />
  <Stats />
  <WhyChooseUs />
  <EventCategories />
  <DecorPreview />
  <FoodPreview />
  </>
  );
}

export default Home;