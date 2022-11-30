useEffect(() => {
  monkey.scene.scale.set(1, 1, 1);
  monkey.scene.position.set(0, 1.5, 5);
  monkey.scene.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
      object.material.envMapIntensity = 0.5;
    }
  });
}, [object]);
