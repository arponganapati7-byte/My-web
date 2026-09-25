import { useEffect, useState } from "react";

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [ripple, setRipple] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let animationFrame;
    let startTime = null;

    const triggerRipple = () => {
      setRipple(false);

      requestAnimationFrame(() => {
        setRipple(true);
      });
    };

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / 3500,
        1
      );

      const easedProgress =
        easeOutCubic(progress);

      const currentCount =
        Math.floor(
          easedProgress * 100
        );

      setCount(currentCount);

      if (currentCount >= 90) {
        triggerRipple();
      }

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      } else {
        setTimeout(() => {
          setHidden(true);

          if (onComplete) {
            onComplete();
          }
        }, 600);
      }
    };

    const nameTimer = setTimeout(() => {
      const name =
        document.getElementById(
          "loaderName"
        );

      if (name) {
        name.style.opacity = "1";
        name.style.transform =
          "translateY(0)";
      }
    }, 500);

    const rippleTimer =
      setTimeout(() => {
        triggerRipple();
      }, 150);

    const countdownTimer =
      setTimeout(() => {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      }, 800);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      clearTimeout(nameTimer);
      clearTimeout(rippleTimer);
      clearTimeout(
        countdownTimer
      );
    };
  }, [onComplete]);

  useEffect(() => {
    if (!hidden) {
      document.body.classList.add(
        "loading"
      );
    } else {
      document.body.classList.remove(
        "loading"
      );
    }

    return () => {
      document.body.classList.remove(
        "loading"
      );
    };
  }, [hidden]);

  return (
    <div
      id="preloader"
      className={
        hidden
          ? "preloader-hidden"
          : ""
      }
    >
      <div className="preloader-content">
        <div
          id="loaderCount"
          className={
            ripple
              ? "ripple-effect"
              : ""
          }
        >
          {count}
        </div>

        <div id="loaderName">
          ARPON GANAPATI
        </div>
      </div>
    </div>
  );
}

export default Preloader;