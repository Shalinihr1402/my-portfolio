import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import { handleGreetingAnimation } from "./utils/waveUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import SpeechBubble from "./SpeechBubble";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let jawBone: THREE.Object3D | null = null;
      let rEyeBone: THREE.Object3D | null = null;
      let lEyeBone: THREE.Object3D | null = null;
      let rUpperArm: THREE.Object3D | null = null;
      let rForeArm: THREE.Object3D | null = null;
      let rHand: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let characterModel: THREE.Object3D | null = null;

      const onResize = () => {
        if (characterModel) {
          handleResize(renderer, camera, canvasDiv, characterModel);
        }
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          characterModel = character;
          setChar(character);
          scene.add(character);

          // Skeletal bones for greeting, face expressions, and lip-sync
          headBone =
            character.getObjectByName("CC_Base_Head_040") ||
            character.getObjectByName("spine006") ||
            null;
          jawBone = character.getObjectByName("CC_Base_JawRoot_042") || null;
          rEyeBone = character.getObjectByName("CC_Base_R_Eye_047") || null;
          lEyeBone = character.getObjectByName("CC_Base_L_Eye_048") || null;
          rUpperArm = character.getObjectByName("CC_Base_R_Upperarm_076") || null;
          rForeArm = character.getObjectByName("CC_Base_R_Forearm_079") || null;
          rHand = character.getObjectByName("CC_Base_R_Hand_083") || null;
          screenLight = character.getObjectByName("screenlight") || null;

          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();
        if (mixer) {
          mixer.update(delta);
        }
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
        }
        // Lifelike anime greeting: looks at visitor, waves open palm, lip-syncs, blinks & winks
        handleGreetingAnimation(
          {
            head: headBone,
            jaw: jawBone,
            rEye: rEyeBone,
            lEye: lEyeBone,
            rUpperArm,
            rForeArm,
            rHand,
          },
          elapsedTime,
          window.scrollY
        );
        if (screenLight) {
          light.setPointLight(screenLight);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <SpeechBubble />
        </div>
      </div>
    </>
  );
};

export default Scene;
