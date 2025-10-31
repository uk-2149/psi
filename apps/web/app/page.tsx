import Navbar from "@repo/ui/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  return (
    <div className="bg-bg">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
    </div>
  );
}
