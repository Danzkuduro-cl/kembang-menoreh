import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AtmosphericIntro from "../components/atmosphericintro"
import SignatureExperience from "../components/signatureexperience"
import RoomsBooking from "../components/RoomsShowcase";
import WellnessRitual from "../components/WellnessRitual";
import ResortPursuits from "../components/ResortPursuits";
import TestimonialSection from "../components/TestimonialSection";
import VideoSection from "../components/VideoSection";
import LuxuryFooter from "../components/LuxuryFooter";
import VillaMap from "../components/VillaMap";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <AtmosphericIntro />
      <SignatureExperience />
      <RoomsBooking />
      <WellnessRitual />
      <ResortPursuits />
      <TestimonialSection />
      <VideoSection />
      <VillaMap />
      <LuxuryFooter />

    </main>
  );
}