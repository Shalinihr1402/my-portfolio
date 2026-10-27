import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  const mainElem = document.getElementsByTagName("main")[0];
  if (mainElem) {
    mainElem.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.2,
  });

  // Smooth entrance for Hero components
  gsap.fromTo(
    ".hero-content > *",
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.3,
    }
  );

  // Fade in navbar and floating navigation elements
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out",
      delay: 0.1,
    }
  );
}
