import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/anime_girl.glb",
        async (gltf) => {
          const character = gltf.scene;

          // Scale and frame the anime girl nicely in the hero camera view
          character.scale.set(6.2, 6.2, 6.2);
          character.position.set(0, 4.4, 0);

          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = false;

              if (mesh.material) {
                const mat = mesh.material as any;
                mat.side = THREE.DoubleSide;
                mat.roughness = Math.min(mat.roughness ?? 0.7, 0.75);
                mat.metalness = Math.min(mat.metalness ?? 0.05, 0.1);
                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                }
              }
            }
          });

          await renderer.compileAsync(character, camera, scene);
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading anime_girl GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
