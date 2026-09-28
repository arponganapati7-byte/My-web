// src/components/SkillCard.jsx

function SkillCard({ name, percentage }) {
  return (
    <div className="skill-item group">
      <div className="flex justify-between items-center text-sm md:text-base font-mono mb-2">
        <span className="text-slate-200">
          {name}
        </span>

        <span className="text-slate-300">
          {percentage}%
        </span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="
            skill-progress
            h-full
            rounded-full
            bg-linear-to-r 
            from-indigo-500
            via-blue-500
            to-cyan-400
            
          "
          data-width={`${percentage}%`}
          style={{
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

export default SkillCard;