import { User } from "lucide-react";
import SkillCard from "./SkillCard";

function About() {
  const skills = [
    {
      name: "HTML5 & CSS3",
      percentage: 70,
    },
    {
      name: "JavaScript (ES6+)",
      percentage: 69,
    },
    {
      name: "Git & GitHub",
      percentage: 82,
    },
    {
      name: "C++",
      percentage: 74,
    },
  ];

  return (
    <section
      id="about"
      className="
        grid
        grid-cols-1
        md:grid-cols-12
        gap-6
        mb-40
      "
    >
      {/* About */}
      <div
        className="
          md:col-span-7
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
      </div>

      {/* Skills */}
      <div
        id="skills"
        className="
          md:col-span-5
          glass-panel
          rounded-[2.5rem]
          p-8
          bento-reveal
        "
      >
        <h2 className="text-3xl font-bold mb-8">
          Technical Skills
        </h2>

        <div className="space-y-6">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;