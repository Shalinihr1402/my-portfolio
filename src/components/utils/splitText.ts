import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 75%" : "top 65%";
  const ToggleAction = "play reverse play reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    const triggerEl = para.parentElement?.parentElement || para;
    const isAlreadyInView = ScrollTrigger.isInViewport(triggerEl, 0.2);

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: isAlreadyInView ? 1 : 0, y: isAlreadyInView ? 0 : 40 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: triggerEl,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.9,
        ease: "power3.out",
        y: 0,
        stagger: 0.015,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    const triggerEl = title.parentElement?.parentElement || title;
    const isAlreadyInView = ScrollTrigger.isInViewport(triggerEl, 0.2);

    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: isAlreadyInView ? 1 : 0, y: isAlreadyInView ? 0 : 40, rotate: isAlreadyInView ? 0 : 6 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: triggerEl,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.out",
        y: 0,
        rotate: 0,
        stagger: 0.02,
      }
    );
  });
}
