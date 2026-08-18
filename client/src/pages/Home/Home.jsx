import SEO from "../../components/SEO/SEO";

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
    <>
      <SEO
  title="Grand Pearl Marquee | Wedding & Event Venue"
  description="Grand Pearl Marquee is a wedding and event venue on Main Adyala Road, Rawalpindi, offering elegant weddings, events, décor, food and professional event services."
  keywords="Grand Pearl Marquee, wedding venue Rawalpindi, wedding marquee Rawalpindi, event venue Rawalpindi, wedding hall Rawalpindi"
/>

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
    </>
  );
}

export default Home;