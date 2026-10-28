import * as THREE from "three";

// Upper arm: lifts forward and slightly outward (natural shoulder position)
const waveEulerUpper = new THREE.Euler(0.45, 0, -0.65);
const waveQuatUpper = new THREE.Quaternion().setFromEuler(waveEulerUpper);

// Forearm: clean elbow hinge flexion upward (zero longitudinal twist to preserve sleeve geometry)
const waveEulerFore = new THREE.Euler(1.45, 0, -0.2);
const waveQuatFore = new THREE.Quaternion().setFromEuler(waveEulerFore);

// Hand base: palm faces 100% directly toward camera (+Z) with open fingers pointing straight up (+Y)
const waveEulerHandBase = new THREE.Euler(2.76, -2.44, 1.96);
const waveQuatHandBase = new THREE.Quaternion().setFromEuler(waveEulerHandBase);

// Axis in local hand coordinates that tilts fingers left-to-right across the camera view
const tiltAxis = new THREE.Vector3(-0.9507, 0.0399, -0.3075).normalize();

const tmpQuat = new THREE.Quaternion();
const tiltQuat = new THREE.Quaternion();
const jawAxisZ = new THREE.Vector3(0, 0, 1);
const jawQuat = new THREE.Quaternion();

let heroFadeWeight = 0;

export interface GreetingBones {
  head?: THREE.Object3D | null;
  jaw?: THREE.Object3D | null;
  rEye?: THREE.Object3D | null;
  lEye?: THREE.Object3D | null;
  rUpperArm?: THREE.Object3D | null;
  rForeArm?: THREE.Object3D | null;
  rHand?: THREE.Object3D | null;
}

/**
 * Natural greeting animation:
 * 1. Head turns warmly to look at the visitor.
 * 2. Hand smoothly raises up to cheek/shoulder height.
 * 3. Palm faces 100% forward with open fingers, waving side-to-side (saying "Hai! 👋").
 * 4. Jaw lip-syncs "Hi! Welcome to my portfolio!" in syllable cadence.
 * 5. Blinks naturally and gives a playful anime wink.
 * 6. Lowers hand down smoothly, rests, and repeats.
 */
export const handleGreetingAnimation = (
  bones: GreetingBones,
  elapsedTime: number,
  scrollY: number
) => {
  // Only active when viewer is in the Hero section (scrollY < 180)
  const isHero = scrollY < 180;
  const targetHeroWeight = isHero ? 1.0 : 0.0;
  heroFadeWeight = THREE.MathUtils.lerp(heroFadeWeight, targetHeroWeight, 0.06);

  if (heroFadeWeight < 0.002) return;

  const { head, jaw, rEye, lEye, rUpperArm, rForeArm, rHand } = bones;

  // 5.5-second rhythmic cycle:
  // 0.0s - 0.7s: Arm raises smoothly, head turns to look at visitor
  // 0.7s - 3.0s: Lip-sync "Hi! Welcome to my portfolio!" + open-palm wave side-to-side
  // 3.0s - 3.4s: Friendly anime wink 😉
  // 3.4s - 4.0s: Arm lowers smoothly down to side
  // 4.0s - 5.5s: Hand rests down naturally
  const period = 5.5;
  const cycleTime = elapsedTime % period;
  let cycleWeight = 0;
  let waveTilt = 0;
  let jawOpening = 0;

  if (cycleTime < 0.7) {
    // Smoothstep ease up
    const p = cycleTime / 0.7;
    cycleWeight = p * p * (3 - 2 * p);
  } else if (cycleTime < 3.4) {
    // Waving & Speaking
    cycleWeight = 1.0;
    waveTilt = Math.sin((cycleTime - 0.7) * 5.5) * 0.22;

    // Accurate lip-sync opening for "Hi! Welcome to my portfolio!"
    const speakTime = cycleTime - 0.7; // 0 to 2.7s
    if (speakTime < 0.5) {
      // "Hi!" (wide open then close)
      jawOpening = Math.sin((speakTime / 0.5) * Math.PI) * 0.16;
    } else if (speakTime < 0.7) {
      jawOpening = 0; // brief pause
    } else if (speakTime < 1.3) {
      // "Wel-come"
      jawOpening = Math.abs(Math.sin((speakTime - 0.7) * Math.PI * 3.3)) * 0.13;
    } else if (speakTime < 1.7) {
      // "to my"
      jawOpening = Math.abs(Math.sin((speakTime - 1.3) * Math.PI * 4.0)) * 0.11;
    } else if (speakTime < 2.5) {
      // "port-fo-li-o!"
      jawOpening = Math.abs(Math.sin((speakTime - 1.7) * Math.PI * 4.5)) * 0.14;
    }
  } else if (cycleTime < 4.0) {
    // Smoothstep ease down
    const p = (cycleTime - 3.4) / 0.6;
    cycleWeight = 1.0 - p * p * (3 - 2 * p);
  } else {
    // Hand down at rest
    cycleWeight = 0.0;
  }

  const finalWeight = cycleWeight * heroFadeWeight;

  // 1. ARM & HAND (Natural Wave)
  if (rUpperArm && rForeArm && rHand && finalWeight > 0.002) {
    // Upper arm
    tmpQuat.copy(rUpperArm.quaternion).multiply(waveQuatUpper);
    rUpperArm.quaternion.slerp(tmpQuat, finalWeight);

    // Forearm
    tmpQuat.copy(rForeArm.quaternion).multiply(waveQuatFore);
    rForeArm.quaternion.slerp(tmpQuat, finalWeight);

    // Hand (Open palm facing forward toward user, waving left-to-right)
    tiltQuat.setFromAxisAngle(tiltAxis, waveTilt);
    tmpQuat.copy(waveQuatHandBase).multiply(tiltQuat);
    rHand.quaternion.slerp(tmpQuat, finalWeight);
  }

  // 2. JAW (Lip-Sync)
  if (jaw && heroFadeWeight > 0.002) {
    const finalJawAngle = jawOpening * heroFadeWeight;
    jawQuat.setFromAxisAngle(jawAxisZ, finalJawAngle);
    jaw.quaternion.multiply(jawQuat);
  }

  // 3. BLINKING & WINKING
  if (rEye && lEye) {
    // Regular blink every 3.8s
    const blinkCycle = elapsedTime % 3.8;
    const isBlinking = blinkCycle > 3.68;

    // Charming wink right at the end of the greeting (3.0s to 3.35s)
    const isWinking = cycleTime >= 3.0 && cycleTime < 3.35 && heroFadeWeight > 0.5;

    if (isWinking) {
      // Right eye winks closed, left eye stays open with a smile
      rEye.scale.y = THREE.MathUtils.lerp(rEye.scale.y, 0.1, 0.35);
      lEye.scale.y = THREE.MathUtils.lerp(lEye.scale.y, 1.0, 0.2);
    } else if (isBlinking) {
      // Both eyes blink
      rEye.scale.y = THREE.MathUtils.lerp(rEye.scale.y, 0.1, 0.4);
      lEye.scale.y = THREE.MathUtils.lerp(lEye.scale.y, 0.1, 0.4);
    } else {
      // Eyes open and looking bright
      rEye.scale.y = THREE.MathUtils.lerp(rEye.scale.y, 1.0, 0.2);
      lEye.scale.y = THREE.MathUtils.lerp(lEye.scale.y, 1.0, 0.2);
    }
  }

  // 4. HEAD (Looks directly and warmly at visitor during greeting)
  if (head && finalWeight > 0.002) {
    head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, -0.15, 0.05 * finalWeight);
    head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -0.08, 0.05 * finalWeight);
  }
};
