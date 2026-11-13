'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Chatbot3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 560;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060f1b, 0.025);

    // 2. Camera setup - framed specifically for chatbot panel
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
    camera.position.set(0, 0, 22);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 4. Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x1e153b, 1.4);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xa855f7, 3.5, 40);
    coreLight.position.set(0, 0, 2);
    scene.add(coreLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 45);
    cyanLight.position.set(6, 6, 8);
    scene.add(cyanLight);

    // 5. Dimensional Portal Rings (Matching the signature aesthetic)
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringCount = 12;
    const ringMeshes: THREE.Mesh[] = [];
    const torusGeo = new THREE.TorusGeometry(6.5, 0.06, 16, 80);

    for (let i = 0; i < ringCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x8b5cf6 : 0x06b6d4,
        transparent: true,
        opacity: 0.25 + (i / ringCount) * 0.45,
        wireframe: i % 3 === 0,
      });
      const ring = new THREE.Mesh(torusGeo, ringMat);
      ring.position.z = 15 - i * 3.2;
      ring.scale.setScalar(0.75 + i * 0.07);
      ringsGroup.add(ring);
      ringMeshes.push(ring);
    }

    // 6. Particle Swarm (1,600 glowing particles)
    const particleCount = 1600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x8b5cf6); // electric violet
    const color2 = new THREE.Color(0x38bdf8); // electric blue
    const color3 = new THREE.Color(0xffffff); // core spark white

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 18;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;

      const pick = Math.random();
      const c = pick < 0.45 ? color1 : pick < 0.85 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = Math.random() * 2.2 + 0.6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        attribute float scale;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 pos = position;
          // Gentle floating wave motion
          pos.x += sin(uTime * 0.4 + position.z * 0.1) * 0.6;
          pos.y += cos(uTime * 0.5 + position.x * 0.1) * 0.6;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * (140.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 1.8);
          gl_FragColor = vec4(vColor, strength * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Rotating Neural Intelligence Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.75,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbital electron rings
    const orbitalRingGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 60);
    const orbitalRingMat1 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.65,
    });
    const orbitalRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });

    const orbital1 = new THREE.Mesh(orbitalRingGeo, orbitalRingMat1);
    orbital1.rotation.x = Math.PI / 3;
    coreGroup.add(orbital1);

    const orbital2 = new THREE.Mesh(orbitalRingGeo, orbitalRingMat2);
    orbital2.rotation.y = Math.PI / 2.5;
    coreGroup.add(orbital2);

    // 8. Synaptic Connection Lines
    const lineCount = 20;
    const linePositions = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i++) {
      linePositions[i * 6] = 0;
      linePositions[i * 6 + 1] = 0;
      linePositions[i * 6 + 2] = 0;

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 5.5 + Math.random() * 4;

      linePositions[i * 6 + 3] = r * Math.sin(theta) * Math.cos(phi);
      linePositions[i * 6 + 4] = r * Math.sin(theta) * Math.sin(phi);
      linePositions[i * 6 + 5] = r * Math.cos(theta);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    coreGroup.add(lines);

    // Mouse tilt tracking within panel
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      mouseX = (cx / rect.width - 0.5) * 2;
      mouseY = (cy / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize observer for responsive chatbot panel
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update shader uniform
      particleMat.uniforms.uTime.value = elapsedTime;

      // Rotate rings
      ringsGroup.rotation.z = elapsedTime * 0.12;
      ringMeshes.forEach((rm, idx) => {
        rm.rotation.z = elapsedTime * (0.06 + idx * 0.015) * (idx % 2 === 0 ? 1 : -1);
      });

      // Rotate neural core
      icoMesh.rotation.x = elapsedTime * 0.22;
      icoMesh.rotation.y = elapsedTime * 0.3;
      orbital1.rotation.z = elapsedTime * 0.4;
      orbital2.rotation.y = elapsedTime * 0.35;

      // Pulse core light
      coreLight.intensity = 2.8 + Math.sin(elapsedTime * 3.5) * 0.9;

      // Gentle interactive camera lerp
      const targetX = mouseX * 2.2;
      const targetY = -mouseY * 2.2;
      camera.position.x += (targetX - camera.position.x) * 0.06;
      camera.position.y += (targetY - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbitalRingGeo.dispose();
      orbitalRingMat1.dispose();
      orbitalRingMat2.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
