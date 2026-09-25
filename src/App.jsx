import { useState } from "react";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectSection from "./components/projects/ProjectSection";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import useScrollAnimations from "./hooks/useScrollAnimations";

function App() {
  const [loaded, setLoaded] =
    useState(false);

  useScrollAnimations(loaded);

  return (
    <>
      <Preloader
        onComplete={() =>
          setLoaded(true)
        }
      />

      <Navbar />

      {/* Background blobs */}
      <div
        className="
          blob
          w-[500px]
          h-[500px]
          bg-brand-primary
          top-[-10%]
          left-[-10%]
          animate-pulse
        "
      />

      <div
        className="
          blob
          w-[400px]
          h-[400px]
          bg-brand-accent
          bottom-[-10%]
          right-[-10%]
        "
      />

      <main
        className="
          max-w-6xl
          mx-auto
          px-6
          pt-32
        "
      >
        <Hero />

        <About />

        <ProjectSection />

        <Location />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;