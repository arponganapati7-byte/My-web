// src/components/Skills.jsx

import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Wrench,
  Rocket,
  Cpu,
  CreditCard,
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
        { name: "TypeScript", percentage: 35 },
        { name: "Tailwind CSS", percentage: 50 },
        { name: "React Router", percentage: 40 },
        { name: "Responsive Design", percentage: 55 },
      ],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      skills: [
        { name: "Node.js", percentage: 35 },
        { name: "Express.js", percentage: 30 },
        { name: "REST API Development", percentage: 35 },
        { name: "Server Configuration", percentage: 35 },
        { name: "Environment Variables", percentage: 35 },
        { name: "API Integration", percentage: 40 },
      ],
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "MongoDB", percentage: 35 },
        { name: "MongoDB Atlas", percentage: 45 },
        { name: "Database Connection & Configuration", percentage: 45 },
        { name: "CRUD Operations", percentage: 25 },
      ],
    },
    {
      title: "Authentication & Security",
      icon: ShieldCheck,
      skills: [
        { name: "Firebase Authentication", percentage: 45 },
        { name: "Firebase Admin SDK", percentage: 20 },
        { name: "Authentication Integration", percentage: 35 },
        { name: "Secrets & Environment Configuration", percentage: 35 },
      ],
    },
    {
      title: "Tools & Version Control",
      icon: Wrench,
      skills: [
        { name: "Git", percentage: 65 },
        { name: "GitHub", percentage: 65 },
        { name: "npm", percentage: 50 },
        { name: "VS Code", percentage: 65 },
      ],
    },
    {
      title: "Deployment & Hosting",
      icon: Rocket,
      skills: [
        { name: "Vercel", percentage: 78 },
        { name: "Netlify", percentage: 59 },
        { name: "Render", percentage: 45 },
        { name: "Production Debugging", percentage: 35 },
      ],
    },
    {
      title: "Programming",
      icon: Cpu,
      skills: [
        { name: "C++", percentage: 74 },
        { name: "Python", percentage: 60 },
      ],
    },
    {
      title: "Currently Exploring",
      icon: CreditCard,
      skills: [
        { name: "Stripe Payments", percentage: 10 },
        { name: "Full-Stack Application Architecture", percentage: 35 },
      ],
    },
  ];

  return (
    <section id="skills" className="mb-40">
      <div className="mb-14 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Technical Skills
        </h2>

        {/* Animated Premium Divider */}
        <div className="relative w-32 h-1/2[3px] rounded-full overflow-hidden mb-7">
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-linear-to-r
              from-indigo-500
              via-cyan-400
              to-indigo-500
              animate-[skillLine_2.5s_ease-in-out_infinite]
            "
          />

          <div
            className="
              absolute
              top-0
              left-[-40%]
              w-[40%]
              h-full
              rounded-full
              bg-white/80
              blur-[2px]
              animate-[skillGlow_2.5s_ease-in-out_infinite]
            "
          />
        </div>

        <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
          Technologies, frameworks, databases, and tools I have explored
          through hands-on projects, deployment, and continuous learning.
        </p>
      </div>

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
                <Icon size={26} className="text-brand-primary" />
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