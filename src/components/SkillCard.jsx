function SkillCard({ name, percentage }) {
  return (
    <div className="skill-item group">
      {/* Skill name + percentage */}
      <div
        className="
          flex
          justify-between
          items-center
          text-sm
          md:text-base
          font-mono
          mb-2
        "
      >
        <span
          className="
            text-slate-200
            group-hover:text-white
            transition-colors
            duration-300
          "
        >
          {name}
        </span>

        <span
          className="
            text-slate-300
            group-hover:text-cyan-300
            transition-colors
            duration-300
          "
        >
          {percentage}%
        </span>
      </div>

      {/* Track */}
      <div
        className="
          relative
          h-2
          bg-white/5
          rounded-full
          overflow-hidden
        "
      >
        {/* Animated progress */}
        <div
          className="
            skill-progress
            h-full
            rounded-full
            bg-linear-to-r {
            from-indigo-500
            via-blue-500
            to-cyan-400
           }
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