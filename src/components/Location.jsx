import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

function Location() {
  const [time, setTime] = useState("");
  const [available, setAvailable] =
    useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatter =
        new Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "Asia/Dhaka",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        );

      setTime(
        formatter.format(now)
      );

      const hour = parseInt(
        new Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "Asia/Dhaka",
            hour: "numeric",
            hour12: false,
          }
        ).format(now),
        10
      );

      setAvailable(
        hour >= 7 && hour < 24
      );
    };

    updateTime();

    const interval =
      setInterval(
        updateTime,
        1000
      );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="location"
      className="
        glass-panel
        rounded-[2.5rem]
        p-8
        md:p-10
        mb-40
        flex
        flex-col
        md:flex-row
        items-center
        gap-10
        project-card-reveal
      "
    >
      {/* Details */}
      <div className="flex-1 w-full">
        {/* Live status */}
        <div
          className="
            inline-flex
            items-center
            gap-3
            px-4
            py-2
            rounded-2xl
            bg-slate-900/90
            border
            border-brand-secondary/30
            mb-6
            shadow-[0_0_15px_rgba(6,182,212,0.15)]
          "
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {available && (
              <span
                className="
                  animate-ping
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-brand-secondary
                  opacity-75
                "
              />
            )}

            <span
              className={`
                relative
                inline-flex
                rounded-full
                h-2.5
                w-2.5

                ${
                  available
                    ? "bg-brand-secondary"
                    : "bg-slate-500"
                }
              `}
            />
          </span>

          <div
            className="
              text-xs
              font-mono
              flex
              flex-col
              items-start
              gap-0.5
            "
          >
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">
                Dhaka, BD:
              </span>

              <span className="font-bold text-white">
                {time}
              </span>
            </div>

            <span
              className={
                available
                  ? "text-brand-secondary font-semibold text-[11px]"
                  : "text-slate-500 font-semibold text-[11px]"
              }
            >
              {available
                ? "Available for Projects"
                : "Offline (Back at 7:00 AM)"}
            </span>
          </div>
        </div>

        {/* Heading */}
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
          <MapPin className="text-red-500" />

          Location & Roots
        </h2>

        {/* Cards */}
        <div className="space-y-4">
          <div
            className="
              flex
              items-start
              gap-4
              p-4
              rounded-2xl
              glass-card
            "
          >
            <div className="text-2xl">
              🏠
            </div>

            <div>
              <h4 className="font-bold">
                Home District
              </h4>

              <p className="text-slate-400 text-sm">
                Bauphal, Barisal, Bangladesh
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-start
              gap-4
              p-4
              rounded-2xl
              glass-card
              border-brand-secondary/30
            "
          >
            <div className="text-2xl">
              📍
            </div>

            <div>
              <h4 className="font-bold text-brand-secondary">
                Current Residence
              </h4>

              <p className="text-slate-400 text-sm">
                Ekuria, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div
        className="
          w-full
          md:w-1/2
          h-64
          glass-card
          rounded-[2rem]
          overflow-hidden
          relative
          group
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            grayscale
            opacity-30
            group-hover:grayscale-0
            group-hover:scale-110
            transition-all
            duration-700
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583267746897-2cf41588817d?auto=format&fit=crop&q=80')",
          }}
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-brand-black
            flex
            items-end
            p-8
          "
        >
          <p
            className="
              text-xs
              font-mono
              tracking-widest
              text-white/50
              uppercase
            "
          >
            South Asia // 23.8103° N,
            90.4125° E
          </p>
        </div>
      </div>
    </section>
  );
}

export default Location;