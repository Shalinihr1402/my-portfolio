import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character) return;

  // Initial hero setup: character starts facing slightly towards left (towards hero text)
  character.rotation.set(0, -0.35, 0);

  // Set initial desktop position on the right side
  if (window.innerWidth > 1024) {
    gsap.set(".character-model", { x: "24%", opacity: 1 });
  }

  // Timeline 1: Hero -> About transition
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // Timeline 2: About -> Technical Skills transition
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 30%",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // Timeline 3: Skills -> Career / Projects transition
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "center 20%",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  const neckBone =
    character.getObjectByName("CC_Base_NeckTwist02_039") ||
    character.getObjectByName("CC_Base_NeckTwist01_038") ||
    character.getObjectByName("CC_Base_Head_040");

  if (window.innerWidth > 1024) {
    // Scroll 1: Hero to About Me
    // - Hero text fades and floats up
    // - Character glides smoothly from right (24%) to left (-26%)
    // - Character rotates to face right (toward the About Me text)
    // - Camera subtly zooms in for a cinematic closer framing
    tl1
      .to(".hero-content", { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 0)
      .fromTo(
        ".character-model",
        { x: "24%" },
        { x: "-26%", duration: 1, ease: "power1.inOut" },
        0
      )
      .fromTo(
        character.rotation,
        { y: -0.35 },
        { y: 0.55, duration: 1, ease: "power1.inOut" },
        0
      )
      .fromTo(
        camera.position,
        { z: 24.7, y: 13.1 },
        { z: 22.0, y: 13.2, duration: 1, ease: "power1.inOut" },
        0
      )
      .fromTo(
        ".about-section",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.5
      );

    // Scroll 2: About Me to Technical Skills
    // - About Me fades out smoothly
    // - Character stays comfortably on left (-26%)
    // - Camera pulls back to a balanced 3/4 framing (z: 26.0)
    // - Character turns slightly (y: 0.45) looking toward the skills cards on right
    tl2
      .to(".about-section", { opacity: 0, y: -30, duration: 0.6, ease: "power2.in" }, 0)
      .to(
        camera.position,
        { z: 26.0, y: 13.1, duration: 1, ease: "power1.inOut" },
        0
      )
      .to(
        character.rotation,
        { y: 0.45, duration: 1, ease: "power1.inOut" },
        0
      )
      .to(
        ".character-rim",
        { opacity: 0.5, scale: 1.1, duration: 1 },
        0
      );

    if (neckBone) {
      tl2.to(neckBone.rotation, { x: 0.15, duration: 1 }, 0);
    }

    // Scroll 3: Skills to Career & Work
    // - Character model smoothly fades out so Career and Projects have full-screen canvas
    tl3
      .to(
        ".character-model",
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        0
      )
      .to(
        ".character-rim",
        { opacity: 0, duration: 0.5 },
        0
      );
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 35%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );
}
