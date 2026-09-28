import {
  Code2,
  Server,
  Wrench,
  Rocket,
  Cpu,
} from "lucide-react";

import SkillCard from "./SkillCard";

function Skills() {
  const categories = [
    {
      title: "Frontend Development",
      icon: Code2,
      skills: [
        { name: "HTML5", percentage: 75 },
        { name: "CSS3", percentage: 70 },
        { name: "JavaScript (ES6+)", percentage: 69 },
        { name: "JSX", percentage: 55 },
        { name: "React", percentage: 60 },
        { name: "Vite", percentage: 65 },
        { name: "Tailwind CSS", percentage: 50 },
        { name: "Responsive Design", percentage: 55 },
      ],
    },

    {
      title: "Backend & APIs",
      icon: Server,
      skills: [
        { name: "Node.js", percentage: 30 },
        { name: "Express.js", percentage: 20 },
        { name: "REST API", percentage: 35 },
      ],
    },

    {
      title: "Tools & Version Control",
      icon: Wrench,
      skills: [
        { name: "Git", percentage: 65 },
        { name: "GitHub", percentage: 65 },
        { name: "npm", percentage: 45 },
        { name: "VS Code", percentage: 65 },
      ],
    },

    {
      title: "Deployment",
      icon: Rocket,
      skills: [
        { name: "Netlify", percentage: 55 },
        { name: "Vercel", percentage: 40 },
      ],
    },

    {
      title: "Programming",
      icon: Cpu,
      skills: [
        { name: "C++", percentage: 74 },
      ],
    },
  ];

  return (
    <section id="skills" className="mb-40">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Technical Skills
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl">
          Technologies, frameworks, programming languages,
          tools, and platforms I have learned through
          hands-on projects and continuous practice.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.title}
              className="
                glass-panel
                rounded-[2.5rem]
                p-8
                md:p-10
                skill-category-reveal
              "
            >
              <h3
                className="
                  text-2xl
                  font-bold
                  mb-8
                  flex
                  items-center
                  gap-3
                "
              >
                <Icon
                  size={26}
                  className="text-brand-primary"
                />

                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;