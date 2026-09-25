import LogicGateCard from "./LogicGateCard";
import TicTacToeCard from "./TicTacToeCard";
import SortingVisualizerCard from "./SortingVisualizerCard";

function ProjectSection() {
  return (
    <section
      id="projects"
      className="mb-40"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-4
          "
        >
          Interactive Demos
        </h2>

        <p className="text-slate-500">
          Functional tools built with raw
          JavaScript logic.
        </p>
      </div>

      {/* First two cards */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          mb-8
        "
      >
        <LogicGateCard />

        <TicTacToeCard />
      </div>

      {/* Sorting */}
      <SortingVisualizerCard />
    </section>
  );
}

export default ProjectSection;

