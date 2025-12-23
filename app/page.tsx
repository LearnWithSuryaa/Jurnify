import {
  Hero,
  FeatureSection,
  WorkSection,
  FaqSection,
  WhySection,
} from "./components/landing";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureSection />
      <WhySection />
      <WorkSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
