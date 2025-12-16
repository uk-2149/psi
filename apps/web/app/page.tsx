import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import TechBars from "../components/TechBars";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-bg">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <TechBars opp={false}/>
      <div className="md:hidden">
        <TechBars opp={true}/>
      </div>
      <AboutSection />
      <Footer />
    </div>
  );
}
