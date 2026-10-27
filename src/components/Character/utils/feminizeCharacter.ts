import * as THREE from "three";

export function feminizeCharacter(character: THREE.Object3D) {
  // 1. Locate head bone (spine006 or spine.006)
  const headBone =
    character.getObjectByName("spine006") ||
    character.getObjectByName("spine.006");
  if (!headBone) return;

  // Base hair & face
  const boyHair = character.getObjectByName("hair");
  if (boyHair) {
    boyHair.visible = true;
  }

  // Soften eyebrows slightly
  const eyebrowL = character.getObjectByName("eyebrow_L");
  if (eyebrowL) {
    eyebrowL.scale.set(0.85, 0.65, 0.85);
  }
  const eyebrowR = character.getObjectByName("eyebrow_R");
  if (eyebrowR) {
    eyebrowR.scale.set(0.85, 0.65, 0.85);
  }

  // 2. Materials
  // Rich natural dark hair material with soft sheen
  const darkHairMaterial = new THREE.MeshStandardMaterial({
    color: 0x120e14,
    roughness: 0.35,
    metalness: 0.15,
  });

  // Chic metallic lavender/purple material for specs and scrunchie
  const specsFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0xc084fc,
    roughness: 0.18,
    metalness: 0.8,
    emissive: 0x581c87,
    emissiveIntensity: 0.3,
  });

  // Clear anti-glare glass lens material
  const glassLensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
  });

  const scrunchieMaterial = new THREE.MeshStandardMaterial({
    color: 0x9333ea,
    roughness: 0.45,
    metalness: 0.25,
    emissive: 0x581c87,
    emissiveIntensity: 0.2,
  });

  // Soft light pink / peach-rose lipstick material
  const lipstickMaterial = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // Soft feminine light rose pink
    roughness: 0.35,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
  });

  const femaleFeatures = new THREE.Group();
  femaleFeatures.name = "female_features_group";

  // ==============================================================
  // A. WAVY ("WRINKLE") HIGH PONYTAIL WITH NATURAL TEXTURE
  // ==============================================================
  const scrunchie = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.1, 16, 32),
    scrunchieMaterial
  );
  scrunchie.rotation.x = Math.PI / 4;
  scrunchie.position.set(0.1, 2.48, -0.55);
  femaleFeatures.add(scrunchie);

  const ponyRoot = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 18, 18),
    darkHairMaterial
  );
  ponyRoot.position.set(0.1, 2.5, -0.58);
  femaleFeatures.add(ponyRoot);

  // Main Bouncy Wavy Ponytail (undulating S-curves for natural wavy texture)
  const mainPonyCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 2.52, -0.55),
    new THREE.Vector3(0.24, 2.95, -0.75), // Rises high above head!
    new THREE.Vector3(0.5, 2.75, -1.08),  // Wave 1
    new THREE.Vector3(0.42, 2.2, -1.32),  // Wave 2 (undulates back/forth)
    new THREE.Vector3(0.56, 1.55, -1.48), // Wave 3
    new THREE.Vector3(0.46, 0.85, -1.52), // Wave 4
    new THREE.Vector3(0.52, 0.15, -1.45), // Wave 5
    new THREE.Vector3(0.42, -0.4, -1.35), // Tapered wavy tip
  ]);
  const mainPonyMesh = new THREE.Mesh(
    new THREE.TubeGeometry(mainPonyCurve, 40, 0.24, 14, false),
    darkHairMaterial
  );
  mainPonyMesh.castShadow = true;
  femaleFeatures.add(mainPonyMesh);

  // Second wavy layer for extra curl and fullness
  const secondPonyCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 2.5, -0.55),
    new THREE.Vector3(0.28, 2.9, -0.82),
    new THREE.Vector3(0.38, 2.45, -1.18),
    new THREE.Vector3(0.46, 1.8, -1.38),
    new THREE.Vector3(0.36, 1.1, -1.45),
    new THREE.Vector3(0.42, 0.4, -1.4),
  ]);
  const secondPonyMesh = new THREE.Mesh(
    new THREE.TubeGeometry(secondPonyCurve, 32, 0.2, 12, false),
    darkHairMaterial
  );
  secondPonyMesh.castShadow = true;
  femaleFeatures.add(secondPonyMesh);

  // Smooth back hair cap behind head (z: -0.35, never covers the face)
  const backCap = new THREE.Mesh(
    new THREE.SphereGeometry(1.08, 24, 20),
    darkHairMaterial
  );
  backCap.scale.set(1.0, 1.05, 0.9);
  backCap.position.set(0, 1.6, -0.35);
  backCap.castShadow = true;
  femaleFeatures.add(backCap);

  // ==============================================================
  // B. WAVY SIDE TRESSES (IN FRONT OF EARS - EARS ARE 100% CLEAR!)
  // ==============================================================
  // These flow along the cheekbones in front of the ears (z: 0.5 to 0.75, x: 0.85 to 0.92)
  // The ears sit at x = 1.15, z = 0.0, so the hair NEVER touches or cuts through the ears!
  
  // Left Wavy Strand 1 (primary wavy strand)
  const leftWavyCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.92, 1.62, 0.48), // In front of ear
    new THREE.Vector3(0.85, 1.25, 0.68), // Waves inward toward cheek
    new THREE.Vector3(0.92, 0.85, 0.72), // Waves outward
    new THREE.Vector3(0.84, 0.42, 0.76), // Waves inward along jaw
    new THREE.Vector3(0.88, 0.02, 0.72), // Waves over collar
    new THREE.Vector3(0.82, -0.45, 0.66), // Cascades down chest
    new THREE.Vector3(0.85, -0.88, 0.60),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(leftWavyCurve1, 36, 0.13, 12, false),
      darkHairMaterial
    )
  );

  // Left Wavy Strand 2 (soft curl companion for depth)
  const leftWavyCurve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.96, 1.55, 0.38),
    new THREE.Vector3(0.9, 1.15, 0.62),
    new THREE.Vector3(0.95, 0.72, 0.68),
    new THREE.Vector3(0.87, 0.22, 0.72),
    new THREE.Vector3(0.91, -0.28, 0.65),
    new THREE.Vector3(0.84, -0.75, 0.58),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(leftWavyCurve2, 32, 0.11, 10, false),
      darkHairMaterial
    )
  );

  // Right Wavy Strand 1 (primary wavy strand)
  const rightWavyCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.92, 1.62, 0.48), // In front of ear
    new THREE.Vector3(-0.85, 1.25, 0.68), // Waves inward toward cheek
    new THREE.Vector3(-0.92, 0.85, 0.72), // Waves outward
    new THREE.Vector3(-0.84, 0.42, 0.76), // Waves inward along jaw
    new THREE.Vector3(-0.88, 0.02, 0.72), // Waves over collar
    new THREE.Vector3(-0.82, -0.45, 0.66), // Cascades down chest
    new THREE.Vector3(-0.85, -0.88, 0.60),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(rightWavyCurve1, 36, 0.13, 12, false),
      darkHairMaterial
    )
  );

  // Right Wavy Strand 2 (soft curl companion for depth)
  const rightWavyCurve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.96, 1.55, 0.38),
    new THREE.Vector3(-0.9, 1.15, 0.62),
    new THREE.Vector3(-0.95, 0.72, 0.68),
    new THREE.Vector3(-0.87, 0.22, 0.72),
    new THREE.Vector3(-0.91, -0.28, 0.65),
    new THREE.Vector3(-0.84, -0.75, 0.58),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(rightWavyCurve2, 32, 0.11, 10, false),
      darkHairMaterial
    )
  );

  // ==============================================================
  // C. CHIC DEVELOPER SPECS ("SPECK") - BIG EYES CLEARLY VISIBLE!
  // ==============================================================
  const specsGroup = new THREE.Group();
  specsGroup.name = "developer_specs";

  const lensRadius = 0.32;
  const rimThickness = 0.022;

  // Left Eye Rim & Lens
  const leftRim = new THREE.Mesh(
    new THREE.TorusGeometry(lensRadius, rimThickness, 16, 40),
    specsFrameMaterial
  );
  leftRim.position.set(0.42, 1.32, 1.14);
  leftRim.rotation.y = 0.06;
  leftRim.rotation.x = -0.04;
  specsGroup.add(leftRim);

  const leftLens = new THREE.Mesh(
    new THREE.CircleGeometry(lensRadius - 0.01, 32),
    glassLensMaterial
  );
  leftLens.position.set(0.42, 1.32, 1.14);
  leftLens.rotation.y = 0.06;
  leftLens.rotation.x = -0.04;
  specsGroup.add(leftLens);

  // Right Eye Rim & Lens
  const rightRim = new THREE.Mesh(
    new THREE.TorusGeometry(lensRadius, rimThickness, 16, 40),
    specsFrameMaterial
  );
  rightRim.position.set(-0.42, 1.32, 1.14);
  rightRim.rotation.y = -0.06;
  rightRim.rotation.x = -0.04;
  specsGroup.add(rightRim);

  const rightLens = new THREE.Mesh(
    new THREE.CircleGeometry(lensRadius - 0.01, 32),
    glassLensMaterial
  );
  rightLens.position.set(-0.42, 1.32, 1.14);
  rightLens.rotation.y = -0.06;
  rightLens.rotation.x = -0.04;
  specsGroup.add(rightLens);

  // Curved Nose Bridge
  const bridgeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.12, 1.34, 1.15),
    new THREE.Vector3(0, 1.38, 1.18),
    new THREE.Vector3(0.12, 1.34, 1.15),
  ]);
  specsGroup.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(bridgeCurve, 16, 0.018, 10, false),
      specsFrameMaterial
    )
  );

  // Left Temple Arm (goes naturally back over the ear)
  const leftTempleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.72, 1.32, 1.12),
    new THREE.Vector3(1.05, 1.3, 0.5),
    new THREE.Vector3(1.18, 1.25, -0.05),
  ]);
  specsGroup.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(leftTempleCurve, 20, 0.016, 8, false),
      specsFrameMaterial
    )
  );

  // Right Temple Arm (goes naturally back over the ear)
  const rightTempleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, 1.32, 1.12),
    new THREE.Vector3(-1.05, 1.3, 0.5),
    new THREE.Vector3(-1.18, 1.25, -0.05),
  ]);
  specsGroup.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(rightTempleCurve, 20, 0.016, 8, false),
      specsFrameMaterial
    )
  );

  femaleFeatures.add(specsGroup);

  // ==============================================================
  // D. LIGHT LIPSTICK (SOFT NATURAL PEACH-ROSE PINK)
  // ==============================================================
  // Upper Lip with subtle cupid's bow
  const upperLipCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.24, 0.77, 1.12),
    new THREE.Vector3(-0.11, 0.80, 1.15),
    new THREE.Vector3(0.0, 0.78, 1.16),
    new THREE.Vector3(0.11, 0.80, 1.15),
    new THREE.Vector3(0.24, 0.77, 1.12),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(upperLipCurve, 20, 0.038, 10, false),
      lipstickMaterial
    )
  );

  // Lower Lip (soft full curve)
  const lowerLipCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.21, 0.75, 1.11),
    new THREE.Vector3(0.0, 0.72, 1.15),
    new THREE.Vector3(0.21, 0.75, 1.11),
  ]);
  femaleFeatures.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(lowerLipCurve, 18, 0.042, 10, false),
      lipstickMaterial
    )
  );

  // ==============================================================
  // E. DAINTY GLOWING STUD EARRINGS
  // ==============================================================
  const earringGeo = new THREE.SphereGeometry(0.09, 12, 12);
  const leftEarring = new THREE.Mesh(earringGeo, specsFrameMaterial);
  leftEarring.position.set(1.22, 1.15, -0.05);
  femaleFeatures.add(leftEarring);

  const rightEarring = new THREE.Mesh(earringGeo, specsFrameMaterial);
  rightEarring.position.set(-1.22, 1.15, -0.05);
  femaleFeatures.add(rightEarring);

  // Attach all features directly to head bone so they track head motion in 3D
  headBone.add(femaleFeatures);

  // ==============================================================
  // F. FEMININE DEVELOPER HOODIE COLOR
  // ==============================================================
  character.traverse((child: any) => {
    if (child.isMesh) {
      if (
        child.name === "BODY.SHIRT" ||
        child.name.toLowerCase().includes("shirt")
      ) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(0x381e68); // Stylish deep violet
        if (child.material.roughness !== undefined) {
          child.material.roughness = 0.6;
        }
      }
    }
  });
}
