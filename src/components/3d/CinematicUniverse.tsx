'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030014, 0.018);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 35);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x2e1065, 1.2);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xa855f7, 3, 50);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2, 60);
    blueLight.position.set(12, 10, 10);
    scene.add(blueLight);

    // 5. Dimensional Portal Tunnel (Matching the ring from the video!)
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringCount = 18;
    const ringMeshes: THREE.Mesh[] = [];
    const torusGeo = new THREE.TorusGeometry(8, 0.07, 16, 100);

    for (let i = 0; i < ringCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x8b5cf6 : 0x06b6d4,
        transparent: true,
        opacity: 0.35 + (i / ringCount) * 0.45,
        wireframe: i % 3 === 0,
      });
      const ring = new THREE.Mesh(torusGeo, ringMat);
      ring.position.z = 25 - i * 4.5;
      ring.scale.setScalar(1 + (i * 0.08));
      ringsGroup.add(ring);
      ringMeshes.push(ring);
    }

    // 6. Particle Swarm (3,500 particles with depth & color gradient)
    const particleCount = 3500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x8b5cf6); // electric violet
    const color2 = new THREE.Color(0x38bdf8); // electric blue
    const color3 = new THREE.Color(0xffffff); // core spark white

    for (let i = 0; i < particleCount; i++) {
      // Swirling cylinder + sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 26;
      const z = (Math.random() - 0.5) * 80;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;

      // Color selection
      const mixedColor = Math.random() > 0.4 ? color1.clone().lerp(color2, Math.random()) : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material for glowing circular particles
    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 pos = position;
          // subtle spiral motion
          float angle = uTime * 0.2 + pos.z * 0.03;
          mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
          pos.xy = rot * pos.xy;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (180.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist);
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Central Neural Core (Pulsing holographic geometric nucleus)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, -2);
    scene.add(coreGroup);

    // Outer wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // Floating orbital rings around core
    const orbitalRingGeo = new THREE.TorusGeometry(5, 0.04, 16, 80);
    const orbitalMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const orbitalMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 });

    const orbital1 = new THREE.Mesh(orbitalRingGeo, orbitalMat1);
    orbital1.rotation.x = Math.PI / 3;
    coreGroup.add(orbital1);

    const orbital2 = new THREE.Mesh(orbitalRingGeo, orbitalMat2);
    orbital2.rotation.y = Math.PI / 4;
    orbital2.rotation.x = -Math.PI / 4;
    coreGroup.add(orbital2);

    // 8. Dynamic Synaptic Connections (Lines)
    const lineCount = 45;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const v1 = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ).normalize().multiplyScalar(1.8);

      const v2 = new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      );

      linePositions[i * 6] = v1.x;
      linePositions[i * 6 + 1] = v1.y;
      linePositions[i * 6 + 2] = v1.z;

      linePositions[i * 6 + 3] = v2.x;
      linePositions[i * 6 + 4] = v2.y;
      linePositions[i * 6 + 5] = v2.z;
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const synapses = new THREE.LineSegments(lineGeo, lineMat);
    coreGroup.add(synapses);

    // Mouse Parallax & Scroll tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraZ = 35;
    let targetCameraY = 0;
    let targetCameraX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Scroll camera path:
      // Starts at entrance z = 35
      // Flies through portal tunnel to z = 12 at progress 0.2
      // Passes into core z = 2 at progress 0.5
      // Orbits slightly at projects and contact
      if (progress < 0.25) {
        // Hero scrubbing phase: Camera moves from 35 to 18
        targetCameraZ = 35 - progress * 4 * 17;
        targetCameraY = 0;
        targetCameraX = 0;
      } else if (progress < 0.5) {
        // Identity & Tech phase: Camera reaches core z = 4
        targetCameraZ = 18 - (progress - 0.25) * 4 * 14;
        targetCameraY = Math.sin((progress - 0.25) * Math.PI) * 2;
        targetCameraX = Math.cos((progress - 0.25) * Math.PI) * 2;
      } else {
        // Projects & Capabilities: Floating orbit around the 3D core
        const subProg = (progress - 0.5) * 2;
        targetCameraZ = 4 + Math.sin(subProg * Math.PI) * 5;
        targetCameraY = Math.cos(subProg * Math.PI * 1.5) * 3;
        targetCameraX = Math.sin(subProg * Math.PI * 2) * 4;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update particle shader uniform
      particleMat.uniforms.uTime.value = elapsedTime;

      // Rotate portal rings
      ringsGroup.rotation.z = elapsedTime * 0.08;
      ringMeshes.forEach((rm, idx) => {
        rm.rotation.z = elapsedTime * (0.05 + idx * 0.01) * (idx % 2 === 0 ? 1 : -1);
      });

      // Rotate neural core
      icoMesh.rotation.x = elapsedTime * 0.15;
      icoMesh.rotation.y = elapsedTime * 0.2;
      orbital1.rotation.z = elapsedTime * 0.3;
      orbital2.rotation.y = elapsedTime * 0.25;

      // Pulse light
      coreLight.intensity = 2.5 + Math.sin(elapsedTime * 3) * 0.8;

      // Camera smooth interpolation (lerp)
      const targetX = targetCameraX + mouseX * 2.5;
      const targetY = targetCameraY - mouseY * 2.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

      // Camera looks at core
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeo.dispose();
      particleGeo.dispose();
      icoGeo.dispose();
      innerGeo.dispose();
      orbitalRingGeo.dispose();
      lineGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
