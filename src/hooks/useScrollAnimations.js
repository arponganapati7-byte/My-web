import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useScrollAnimations(isLoaded = true) {
  useEffect(() => {
    if (!isLoaded) return;

    const context = gsap.context(() => {
      /* ========================================
         HERO
      ======================================== */

      const timeline = gsap.timeline();

      timeline
        .from("#hero-img", {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(
          "#hero-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          "#hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          "#hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );

      /* ========================================
         ABOUT
      ======================================== */

      gsap.from(".bento-reveal", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },

        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      /* ========================================
         PROJECTS
      ======================================== */

      gsap.from(".project-card-reveal", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },

        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      /* ========================================
         SKILL BARS
      ======================================== */

      gsap.utils
        .toArray(".skill-progress")
        .forEach((bar) => {
          const width = bar.dataset.width;

          gsap.to(bar, {
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },

            width,
            duration: 1.5,
            ease: "power2.out",
          });
        });
    });

    return () => {
      context.revert();
    };
  }, [isLoaded]);
}

export default useScrollAnimations;