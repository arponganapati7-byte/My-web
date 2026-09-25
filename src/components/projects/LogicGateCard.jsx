import { useMemo, useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

function LogicGateCard() {
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [gate, setGate] = useState("AND");

  const result = useMemo(() => {
    switch (gate) {
      case "AND":
        return inputA && inputB ? 1 : 0;

      case "OR":
        return inputA || inputB ? 1 : 0;

      case "XOR":
        return inputA ^ inputB;

      case "NAND":
        return !(inputA && inputB) ? 1 : 0;

      case "NOR":
        return !(inputA || inputB) ? 1 : 0;

      case "NOT":
        return inputA === 0 ? 1 : 0;

      default:
        return 0;
    }
  }, [inputA, inputB, gate]);

  const formula =
    gate === "NOT"
      ? `Formula: NOT (${inputA}) = ${result}`
      : `Formula: ${inputA} ${gate} ${inputB} = ${result}`;

  const toggleA = () => {
    setInputA((previous) => (previous === 0 ? 1 : 0));
  };

  const toggleB = () => {
    if (gate === "NOT") return;

    setInputB((previous) => (previous === 0 ? 1 : 0));
  };

  return (
    <div
      className="
        glass-panel
        rounded-[3rem]
        p-8
        md:p-10
        flex
        flex-col
        h-full
        border-t
        border-white/10
        project-card-reveal
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-indigo-500/20
            flex
            items-center
            justify-center
          "
        >
          <Zap className="text-indigo-400" />
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            Logic Gate Simulator
          </h3>

          <span className="text-xs font-mono text-slate-500 uppercase">
            Interactive Digital Logic
          </span>
        </div>
      </div>

      {/* Simulator */}
      <div
        className="
          bg-black/40
          rounded-3xl
          p-6
          border
          border-white/5
          mb-8
          flex-grow
        "
      >
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={toggleA}
            className={`
              flex
              flex-col
              items-center
              justify-center
              p-6
              rounded-2xl
              border
              transition-all
              cursor-pointer

              ${
                inputA === 1
                  ? `
                    bg-emerald-950/20
                    border-emerald-500/50
                    shadow-[0_0_20px_rgba(16,185,129,0.2)]
                  `
                  : `
                    bg-slate-900/50
                    border-white/10
                  `
              }
            `}
          >
            <span className="text-xs font-mono text-slate-400 mb-2">
              INPUT A
            </span>

            <span
              className={`
                text-4xl
                font-bold

                ${
                  inputA === 1
                    ? `
                      text-emerald-400
                      drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]
                    `
                    : "text-slate-500"
                }
              `}
            >
              {inputA}
            </span>
          </button>

          <button
            onClick={toggleB}
            disabled={gate === "NOT"}
            className={`
              flex
              flex-col
              items-center
              justify-center
              p-6
              rounded-2xl
              border
              transition-all
              cursor-pointer

              ${
                inputB === 1
                  ? `
                    bg-emerald-950/20
                    border-emerald-500/50
                    shadow-[0_0_20px_rgba(16,185,129,0.2)]
                  `
                  : `
                    bg-slate-900/50
                    border-white/10
                  `
              }

              ${gate === "NOT" ? "opacity-30 cursor-not-allowed" : ""}
            `}
          >
            <span className="text-xs font-mono text-slate-400 mb-2">
              INPUT B
            </span>

            <span
              className={`
                text-4xl
                font-bold

                ${
                  inputB === 1
                    ? `
                      text-emerald-400
                      drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]
                    `
                    : "text-slate-500"
                }
              `}
            >
              {inputB}
            </span>
          </button>
        </div>

        {/* Gate selector */}
        <div className="relative mb-6">
          <select
            value={gate}
            onChange={(event) => setGate(event.target.value)}
            className="
              w-full
              bg-slate-900/80
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-brand-primary
              appearance-none
              font-mono
              text-sm
              cursor-pointer
            "
          >
            <option value="AND">AND GATE</option>
            <option value="OR">OR GATE</option>
            <option value="XOR">XOR GATE</option>
            <option value="NAND">NAND GATE</option>
            <option value="NOR">NOR GATE</option>
            <option value="NOT">NOT GATE (Input A)</option>
          </select>

          <div
            className="
              absolute
              right-4
              top-3.5
              pointer-events-none
              text-slate-500
            "
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Formula */}
        <div
          className="
            text-xs
            font-mono
            text-center
            text-slate-400
            mb-4
            bg-white/5
            py-2
            rounded-lg
          "
        >
          {formula}
        </div>

        {/* Output */}
        <div
          className="
            flex
            items-center
            justify-between
            p-4
            bg-brand-primary/5
            border
            border-brand-primary/20
            rounded-2xl
          "
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                w-3
                h-3
                rounded-full
                transition-all

                ${
                  result === 1
                    ? `
                      bg-cyan-400
                      shadow-[0_0_15px_rgba(34,211,238,1)]
                    `
                    : "bg-slate-700"
                }
              `}
            />

            <span className="font-bold">
              Output Signal:
            </span>
          </div>

          <span
            className={`
              text-3xl
              font-black

              ${
                result === 1
                  ? `
                    text-cyan-400
                    drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
                  `
                  : "text-slate-600"
              }
            `}
          >
            {result}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Boolean Logic
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Digital Circuits
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          DOM Logic
        </span>
      </div>
    </div>
  );
}

export default LogicGateCard;