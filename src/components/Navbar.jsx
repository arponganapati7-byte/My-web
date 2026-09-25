import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <nav
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-50
        w-[90%]
        max-w-4xl
      "
    >
      <div
        className={`
          flex
          items-center
          justify-between
          transition-all
          duration-500

          ${
            scrolled
              ? `
                glass-panel
                py-3
                px-8
                rounded-full
                shadow-2xl
              `
              : `
                bg-transparent
                py-4
                px-6
              `
          }
        `}
      >
        {/* Logo */}
        <div
          className="
            flex
            items-center
            gap-2
            font-bold
            tracking-tighter
            text-xl
            font-mono
          "
        >
          <span className="text-brand-primary">
            ARPON
          </span>

          <span className="text-brand-secondary">
            .
          </span>
        </div>

        {/* Links */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-6
            text-sm
            font-medium
          "
        >
          <a
            href="#home"
            className="hover:text-brand-primary transition-colors"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-brand-primary transition-colors"
          >
            About
          </a>

          <a
            href="#skills"
            className="hover:text-brand-primary transition-colors"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="hover:text-brand-primary transition-colors"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="hover:text-brand-primary transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Hire */}
        <a
          href="#contact"
          className="
            px-4
            py-2
            bg-white
            text-black
            rounded-full
            text-xs
            font-bold
            hover:scale-105
            transition-transform
          "
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
export default Navbar;