import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  let activeWalkAction: THREE.AnimationAction | null = null;

  if (gltf.animations && gltf.animations.length > 0) {
    // Look for walking or ambient clips
    const walkClip =
      gltf.animations.find((c) => c.name === "Scene") ||
      gltf.animations.find((c) => c.name.toLowerCase().includes("walk")) ||
      gltf.animations[0];

    if (walkClip) {
      activeWalkAction = mixer.clipAction(walkClip);
      activeWalkAction.setLoop(THREE.LoopRepeat, Infinity);
      activeWalkAction.timeScale = 1.0;
      activeWalkAction.play();
    }
  }

  function startIntro() {
    if (activeWalkAction && !activeWalkAction.isRunning()) {
      activeWalkAction.reset().play();
    }
  }

  function hover(_gltf: GLTF, _hoverDiv: HTMLDivElement) {
    // Safe hover handler
    return () => {};
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;
