import Hero from "../../components/Hero/Hero";
import AboutPreview from "../../components/Venue/AboutPreview";
import Stats from "../../components/Home/Stats";
import WhyChooseUs from "../../components/Venue/WhyChooseUs";
import EventCategories from "../../components/Home/EventCategories";
import DecorPreview from "../../components/Home/DecorPreview";
import FoodPreview from "../../components/Home/FoodPreview";
import BookingSteps from "../../components/Home/BookingSteps";
import GalleryPreview from "../../components/Home/GalleryPreview";
import CallToAction from "../../components/Home/CallToAction";

function Home() {
  return (
   <div className="home-page">
  <Hero />
  <AboutPreview />
  <Stats />
  <WhyChooseUs />
  <EventCategories />
  <DecorPreview />
  <FoodPreview />
  <BookingSteps />
  <GalleryPreview />
  <CallToAction />
  </div>
  );
}

export default Home;