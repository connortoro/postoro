// components/ThreeScene.jsx
'use client'; // Required for hooks like useEffect, useRef

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// Removed OrbitControls import
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ToroBot() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelPath = '../torobot/scene.gltf';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) {
      console.warn('Mount point not found, skipping Three.js setup.');
      return;
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Dark gray background

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      currentMount.clientWidth / currentMount.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    // Zoomed out camera position (increased Z value)
    camera.position.z = 200; // Adjust this value as needed for your model

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // --- Controls (Removed) ---
    // const controls = new OrbitControls(camera, renderer.domElement);
    // ... controls setup removed ...

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Slightly brighter ambient
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Slightly brighter directional
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // --- Model Loader ---
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null; // Keep track of the loaded model

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        // Optional: Center the model and adjust scale if needed
        // const box = new THREE.Box3().setFromObject(model);
        // const center = box.getCenter(new THREE.Vector3());
        // model.position.sub(center); // Center the model's geometry at the origin
        // model.scale.set(1, 1, 1); // Adjust scale if necessary
        scene.add(model);
        console.log('Model loaded successfully');
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // --- Animation Loop ---
    let animationFrameId: number;
    const rotationSpeed = 0.005; // Adjust for faster/slower rotation

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate the model if it's loaded
      if (model) {
        model.rotation.y += rotationSpeed; // Rotate around the Y-axis
      }

      // controls.update(); // Removed controls update
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      const currentMountOnResize = mountRef.current;
      if (currentMountOnResize) {
        camera.aspect =
          currentMountOnResize.clientWidth / currentMountOnResize.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          currentMountOnResize.clientWidth,
          currentMountOnResize.clientHeight
        );
      }
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup function on component unmount ---
    return () => {
      console.log('Cleaning up Three.js scene');
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      const finalMount = mountRef.current;

      // Dispose of Three.js objects
      renderer.dispose();
      // controls.dispose(); // Removed controls disposal

      // Dispose scene contents
      if (model) {
        scene.remove(model);
        model.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else if (object.material) {
              object.material.dispose();
            }
          }
        });
      }
      scene.remove(ambientLight);
      ambientLight.dispose();
      scene.remove(directionalLight);
      directionalLight.dispose();

      // Remove renderer's canvas from DOM
      if (finalMount && renderer.domElement.parentNode === finalMount) {
        finalMount.removeChild(renderer.domElement);
      } else if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]); // Re-run effect if modelPath changes

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100vh', display: 'block' }}
    ></div>
  );
}
