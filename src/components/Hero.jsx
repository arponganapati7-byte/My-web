import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

function Hero() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning ☀️, I'm Arpon";
    }

    if (hour >= 12 && hour < 18) {
      return "Good Afternoon 🌤️, I'm Arpon";
    }

    return "Good Evening 🌙, I'm Arpon";
  }, []);

  return (
    <section
      id="home"
      className="text-center mb-32"
    >
      {/* Profile Image */}
      <div
        className="relative mb-8 flex justify-center items-center"
        id="hero-img"
      >
        <div
          className="
            relative
            w-36 h-36
            md:w-44 md:h-44
            rounded-full
            border-4
            border-sky-400
            shadow-[0_0_20px_rgba(56,189,248,0.6)]
            overflow-hidden
          "
        >
          <img
            src={`${import.meta.env.BASE_URL}images/profile.jpg`}
            alt="Arpon"
            className="
              w-full
              h-full
              object-cover
              object-center
              aspect-square
            "
          />
        </div>

        {/* Status indicator */}
        <div
          className="
            absolute
            bottom-1
            right-[calc(50%-4.5rem)]
            md:right-[calc(50%-5.5rem)]
            translate-x-8
            flex
            items-center
            justify-center
          "
        >
          <span
            id="heroStatusPulse"
            className="
              animate-ping
              absolute
              inline-flex
              h-5 w-5
              md:h-6 md:w-6
              rounded-full
              bg-emerald-400
              opacity-75
          "
          />

          <span
            id="heroStatusDot"
            className="
              relative
              bg-emerald-500
              w-5 h-5
              md:w-6 md:h-6
              rounded-full
              border-4
              border-[#0b0f19]
            "
          />
        </div>
      </div>

      {/* Status badge */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1
          rounded-full
          bg-brand-primary/10
          border
          border-brand-primary/20
          mb-6
        "
      >
        <span
          id="heroBadgeStatus"
          className="
            text-[10px]
            font-mono
            uppercase
            tracking-[0.2em]
            text-brand-secondary
          "
        >
          Available for Projects
        </span>
      </div>

      {/* Greeting */}
      <h1
        id="hero-title"
        className="
          text-5xl
          md:text-7xl
          font-black
          tracking-tighter
          mb-6
        "
      >
        {greeting}
      </h1>

      {/* Subtitle */}
      <p
        id="hero-subtitle"
        className="
          text-lg
          md:text-xl
          text-slate-400
          max-w-2xl
          leading-relaxed
          mb-10
          mx-auto
        "
      >
        Aspiring Software Developer & Tech Enthusiast.
        Building clean, interactive, and responsive web
        experiences from scratch.
      </p>

      {/* Buttons */}
      <div
        id="hero-cta"
        className="
          flex
          flex-wrap
          justify-center
          gap-4
        "
      >
        <a
          href="#projects"
          className="
            px-8
            py-4
            bg-brand-primary
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
            hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
            transition-all
          "
        >
          View Projects

          <ArrowRight className="w-4 h-4" />
        </a>

        <a
          href="#contact"
          className="
            px-8
            py-4
            glass-card
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
          "
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}

export default Hero;