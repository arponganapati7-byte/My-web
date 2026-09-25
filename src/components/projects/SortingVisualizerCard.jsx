import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";

function SortingVisualizerCard() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] =
    useState("bubble");

  const [speed, setSpeed] =
    useState(100);

  const [isSorting, setIsSorting] =
    useState(false);

  const [activeIndexes, setActiveIndexes] =
    useState([]);

  const [swappingIndexes, setSwappingIndexes] =
    useState([]);

  const [sortedIndexes, setSortedIndexes] =
    useState([]);

  const stopRef = useRef(false);
  const sortingRef = useRef(false);

  const getArraySize = () => {
    return window.innerWidth < 640
      ? 20
      : 35;
  };

  const generateNewArray = () => {
    if (sortingRef.current) return;

    const size = getArraySize();

    const newArray = Array.from(
      { length: size },
      () =>
        Math.floor(
          Math.random() * 210
        ) + 20
    );

    setArray(newArray);
    setActiveIndexes([]);
    setSwappingIndexes([]);
    setSortedIndexes([]);
  };

  const getDelay = () => {
    return Math.max(
      16,
      510 - Number(speed)
    );
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  useEffect(() => {
    generateNewArray();

    const handleResize = () => {
      if (!sortingRef.current) {
        generateNewArray();
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const bubbleSort = async () => {
    const workingArray = [...array];
    const len = workingArray.length;

    const sorted = [];

    for (let i = 0; i < len - 1; i++) {
      for (
        let j = 0;
        j < len - i - 1;
        j++
      ) {
        if (stopRef.current) return;

        setActiveIndexes([j, j + 1]);

        await sleep(getDelay());

        if (
          workingArray[j] >
          workingArray[j + 1]
        ) {
          setSwappingIndexes([
            j,
            j + 1,
          ]);

          const temp =
            workingArray[j];

          workingArray[j] =
            workingArray[j + 1];

          workingArray[j + 1] =
            temp;

          setArray([
            ...workingArray,
          ]);

          await sleep(getDelay());

          setSwappingIndexes([]);
        }

        setActiveIndexes([]);
      }

      sorted.push(len - 1 - i);

      setSortedIndexes([
        ...sorted,
      ]);
    }

    if (!stopRef.current) {
      setSortedIndexes(
        Array.from(
          { length: len },
          (_, index) => index
        )
      );
    }
  };

  const selectionSort = async () => {
    const workingArray = [...array];
    const len = workingArray.length;

    const sorted = [];

    for (let i = 0; i < len; i++) {
      let minIndex = i;

      setActiveIndexes([
        minIndex,
      ]);

      for (
        let j = i + 1;
        j < len;
        j++
      ) {
        if (stopRef.current) return;

        setActiveIndexes([
          minIndex,
          j,
        ]);

        await sleep(getDelay());

        if (
          workingArray[j] <
          workingArray[minIndex]
        ) {
          minIndex = j;

          setActiveIndexes([
            minIndex,
          ]);
        }
      }

      if (minIndex !== i) {
        setSwappingIndexes([
          i,
          minIndex,
        ]);

        await sleep(getDelay());

        const temp =
          workingArray[i];

        workingArray[i] =
          workingArray[minIndex];

        workingArray[minIndex] =
          temp;

        setArray([
          ...workingArray,
        ]);

        await sleep(getDelay());

        setSwappingIndexes([]);
      }

      setActiveIndexes([]);

      sorted.push(i);

      setSortedIndexes([
        ...sorted,
      ]);
    }
  };

  const insertionSort = async () => {
    const workingArray = [...array];
    const len = workingArray.length;

    const sorted = [0];

    setSortedIndexes([0]);

    for (
      let i = 1;
      i < len;
      i++
    ) {
      if (stopRef.current) return;

      const key =
        workingArray[i];

      let j = i - 1;

      setSwappingIndexes([i]);

      await sleep(getDelay());

      while (
        j >= 0 &&
        workingArray[j] > key
      ) {
        if (stopRef.current) return;

        setActiveIndexes([j]);

        await sleep(getDelay());

        workingArray[j + 1] =
          workingArray[j];

        setArray([
          ...workingArray,
        ]);

        setActiveIndexes([]);

        j--;
      }

      workingArray[j + 1] =
        key;

      setArray([
        ...workingArray,
      ]);

      setSwappingIndexes([]);

      sorted.push(i);

      setSortedIndexes([
        ...sorted,
      ]);
    }

    if (!stopRef.current) {
      setSortedIndexes(
        Array.from(
          { length: len },
          (_, index) => index
        )
      );
    }
  };

  const startSorting = async () => {
    if (sortingRef.current) {
      return;
    }

    sortingRef.current = true;
    stopRef.current = false;

    setIsSorting(true);

    setActiveIndexes([]);
    setSwappingIndexes([]);
    setSortedIndexes([]);

    if (
      sortedIndexes.length ===
      array.length
    ) {
      generateNewArray();

      await sleep(20);
    }

    try {
      if (algorithm === "bubble") {
        await bubbleSort();
      }

      if (
        algorithm === "selection"
      ) {
        await selectionSort();
      }

      if (
        algorithm === "insertion"
      ) {
        await insertionSort();
      }
    } finally {
      sortingRef.current = false;

      setIsSorting(false);

      setActiveIndexes([]);
      setSwappingIndexes([]);

      if (!stopRef.current) {
        setSortedIndexes(
          Array.from(
            {
              length: array.length,
            },
            (_, index) => index
          )
        );
      }
    }
  };

  const stopSorting = () => {
    stopRef.current = true;
    sortingRef.current = false;

    setIsSorting(false);

    setActiveIndexes([]);
    setSwappingIndexes([]);
    setSortedIndexes([]);
  };

  return (
    <div
      className="
        glass-panel
        rounded-[3rem]
        p-8
        md:p-10
        border-t
        border-white/10
        project-card-reveal
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          justify-between
          gap-4
          mb-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-purple-500/20
              flex
              items-center
              justify-center
            "
          >
            <BarChart3 className="text-purple-400" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Sorting Visualizer
            </h3>

            <span className="text-xs font-mono text-slate-500 uppercase">
              Algorithm Execution Engine
            </span>
          </div>
        </div>

        {/* Controls */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <button
            onClick={generateNewArray}
            disabled={isSorting}
            className="
              px-4
              py-2
              rounded-xl
              text-xs
              font-mono
              font-semibold
              text-brand-secondary
              bg-brand-secondary/10
              border
              border-brand-secondary/30
              hover:bg-brand-secondary/20
              transition-all
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            New Array
          </button>

          <select
            value={algorithm}
            onChange={(event) =>
              setAlgorithm(
                event.target.value
              )
            }
            disabled={isSorting}
            className="
              px-3
              py-2
              rounded-xl
              text-xs
              font-mono
              font-semibold
              bg-slate-900/80
              border
              border-white/10
              text-white
              outline-none
              focus:border-brand-primary
              disabled:opacity-30
            "
          >
            <option value="bubble">
              Bubble Sort
            </option>

            <option value="selection">
              Selection Sort
            </option>

            <option value="insertion">
              Insertion Sort
            </option>
          </select>

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-mono
              text-slate-400
            "
          >
            <label htmlFor="speedSlider">
              Speed:
            </label>

            <input
              id="speedSlider"
              type="range"
              min="10"
              max="500"
              value={speed}
              onChange={(event) =>
                setSpeed(
                  event.target.value
                )
              }
              className="
                accent-brand-primary
                w-20
              "
            />
          </div>

          <button
            onClick={startSorting}
            disabled={isSorting}
            className="
              px-4
              py-2
              rounded-xl
              text-xs
              font-mono
              font-semibold
              text-emerald-400
              bg-emerald-500/20
              border
              border-emerald-500/40
              hover:bg-emerald-500/30
              transition-all
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            Start
          </button>

          <button
            onClick={stopSorting}
            disabled={!isSorting}
            className="
              px-4
              py-2
              rounded-xl
              text-xs
              font-mono
              font-semibold
              text-rose-400
              bg-rose-500/20
              border
              border-rose-500/40
              hover:bg-rose-500/30
              transition-all
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            Stop
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div
        className="
          bg-black/40
          rounded-3xl
          p-6
          border
          border-white/5
          mb-6
        "
      >
        <div
          className="
            w-full
            flex
            items-end
            justify-center
            gap-1.5
            h-[260px]
            pb-1
          "
        >
          {array.map((value, index) => {
            const isComparing =
              activeIndexes.includes(
                index
              );

            const isSwapping =
              swappingIndexes.includes(
                index
              );

            const isSorted =
              sortedIndexes.includes(
                index
              );

            let className =
              "array-bar";

            if (isComparing) {
              className +=
                " comparing";
            }

            if (isSwapping) {
              className +=
                " swapping";
            }

            if (isSorted) {
              className +=
                " sorted";
            }

            return (
              <div
                key={index}
                className={className}
                style={{
                  height: `${value}px`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Data Structures
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Async Animation
        </span>

        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono border border-white/10">
          Time Complexity
        </span>
      </div>
    </div>
  );
}

export default SortingVisualizerCard;