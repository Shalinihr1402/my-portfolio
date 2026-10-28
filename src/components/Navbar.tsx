import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      speed: 1.4,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const handleLinkClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("data-href") || anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          if (smoother && typeof smoother.scrollTo === "function") {
            smoother.scrollTo(targetElement, true, "top top");
          } else {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>(
      ".header ul a, .hero-actions a[href^='#']"
    );
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title logo-link" data-cursor="disable">
          <svg
            className="animated-logo"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="SHR logo"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            <circle
              className="logo-orbit"
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              strokeDasharray="12 7"
            />

            <path
              d="M66 35 C66 28 58 24 48 24 C36 24 30 30 30 39 C30 49 40 52 56 55 C70 58 76 63 76 72 C76 82 66 86 50 86 C36 86 28 80 28 72"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="74" cy="24" r="4" fill="#22d3ee" />
          </svg>

          <span className="logo-text">
            SHALU<span>.</span>
          </span>
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
