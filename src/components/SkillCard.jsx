function SkillCard({ name, percentage }) {
  return (
    <div className="skill-item">
      <div className="flex justify-between text-sm font-mono mb-2">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="skill-progress h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
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