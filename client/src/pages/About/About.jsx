import SEO from "../../components/SEO/SEO";

import AboutHero from "../../components/About/AboutHero";
import OurStory from "../../components/About/OurStory";
import Facilities from "../../components/About/Facilities";
import MissionVision from "../../components/About/MissionVision";
import TrustSection from "../../components/About/TrustSection";
import CallToAction from "../../components/Home/CallToAction";

function About() {
  return (
    <>
      <SEO
  title="About Grand Pearl Marquee | Wedding Venue in Rawalpindi"
  description="Learn about Grand Pearl Marquee, a wedding and event venue on Main Adyala Road, Rawalpindi, offering elegant celebrations, décor, food and event services."
  keywords="about Grand Pearl Marquee, wedding venue Rawalpindi, event venue Rawalpindi, marquee Rawalpindi, wedding hall Rawalpindi"
/>

      <div className="about-page">
        <AboutHero />

        <OurStory />

        <Facilities />

        <MissionVision />

        <TrustSection />

        <CallToAction />
      </div>
    </>
  );
}

export default About;