import { User } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="
        mb-32
        glass-panel
        rounded-[2.5rem]
        p-8
        md:p-12
        bento-reveal
      "
    >
      <h2
        className="
          text-3xl
          md:text-4xl
          font-bold
          mb-6
          flex
          items-center
          gap-3
        "
      >
        <User className="text-brand-primary" />

        About Me
      </h2>

      <p
        className="
          text-slate-400
          leading-relaxed
          text-lg
        "
      >
        Welcome to my official personal site! I am
        passionate about web development, physical
        conditioning, and exploring new hardware tech.

        <br />
        <br />

        I'm currently focused on building modern web
        applications while expanding my programming
        skill set, combining technical logic with
        creative aesthetics.
      </p>
    </section>
  );
}

export default About;