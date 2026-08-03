import AboutHero from "../../components/About/AboutHero";
import OurStory from "../../components/About/OurStory";
import Facilities from "../../components/About/Facilities";
import MissionVision from "../../components/About/MissionVision";
import TrustSection from "../../components/About/TrustSection";
import CallToAction from "../../components/Home/CallToAction";

function About() {
  return (
    <div className="about-page">
      <AboutHero />
      <OurStory />
      <Facilities />
      <MissionVision />
      <TrustSection />
      <CallToAction />
    </div>
  );
}

export default About;