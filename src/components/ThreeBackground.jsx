import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 3 });

    // --- CUSTOM TECH OBJECTS ---

    // 1. Laptop (Web Development)
    const createLaptop = () => {
      const group = new THREE.Group();
      const baseGeom = new THREE.BoxGeometry(2, 0.2, 1.5);
      const baseMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.add(new THREE.LineSegments(new THREE.EdgesGeometry(baseGeom), lineMaterial));
      
      const screenGeom = new THREE.BoxGeometry(2, 1.5, 0.2);
      const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const screen = new THREE.Mesh(screenGeom, screenMat);
      screen.position.set(0, 0.85, -0.65);
      screen.rotation.x = -0.2; // Dimiringkan
      screen.add(new THREE.LineSegments(new THREE.EdgesGeometry(screenGeom), lineMaterial));
      
      // Layar dalam (biru)
      const innerScreenGeom = new THREE.BoxGeometry(1.8, 1.2, 0.21);
      const innerScreenMat = new THREE.MeshBasicMaterial({ color: 0x007fff });
      const innerScreen = new THREE.Mesh(innerScreenGeom, innerScreenMat);
      screen.add(innerScreen);

      group.add(base);
      group.add(screen);
      return group;
    };

    // 2. Microchip (IoT / Hardware)
    const createMicrochip = () => {
      const group = new THREE.Group();
      const bodyGeom = new THREE.BoxGeometry(1.5, 0.3, 1.5);
      const bodyMat = new THREE.MeshBasicMaterial({ color: 0x00c853 });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeom), lineMaterial));
      group.add(body);

      const pinGeom = new THREE.BoxGeometry(0.3, 0.1, 0.2);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
      
      for (let i = -0.5; i <= 0.5; i += 0.5) {
        const pinL = new THREE.Mesh(pinGeom, pinMat);
        pinL.position.set(-0.85, 0, i);
        group.add(pinL);
        
        const pinR = new THREE.Mesh(pinGeom, pinMat);
        pinR.position.set(0.85, 0, i);
        group.add(pinR);
      }
      return group;
    };

    // 3. Database Server (Backend / Web Dev)
    const createDatabase = () => {
      const group = new THREE.Group();
      const cylGeom = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 16);
      const cylMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const cyl = new THREE.Mesh(cylGeom, cylMat);
      cyl.add(new THREE.LineSegments(new THREE.EdgesGeometry(cylGeom), lineMaterial));
      group.add(cyl);
      
      const ringGeom = new THREE.TorusGeometry(0.85, 0.15, 8, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
      
      [-0.6, 0, 0.6].forEach(y => {
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.y = y;
        ring.rotation.x = Math.PI / 2;
        ring.add(new THREE.LineSegments(new THREE.EdgesGeometry(ringGeom), lineMaterial));
        group.add(ring);
      });
      
      return group;
    };

    // 4. Bar Chart (Data Analyst)
    const createBarChart = () => {
      const group = new THREE.Group();
      
      const barMat1 = new THREE.MeshBasicMaterial({ color: 0xef3b2c });
      const barMat2 = new THREE.MeshBasicMaterial({ color: 0xffe600 });
      const barMat3 = new THREE.MeshBasicMaterial({ color: 0x00c853 });
      
      const b1 = new THREE.BoxGeometry(0.5, 1, 0.5);
      const m1 = new THREE.Mesh(b1, barMat1);
      m1.position.set(-0.7, 0.5, 0);
      m1.add(new THREE.LineSegments(new THREE.EdgesGeometry(b1), lineMaterial));
      
      const b2 = new THREE.BoxGeometry(0.5, 2, 0.5);
      const m2 = new THREE.Mesh(b2, barMat2);
      m2.position.set(0, 1, 0);
      m2.add(new THREE.LineSegments(new THREE.EdgesGeometry(b2), lineMaterial));
      
      const b3 = new THREE.BoxGeometry(0.5, 3, 0.5);
      const m3 = new THREE.Mesh(b3, barMat3);
      m3.position.set(0.7, 1.5, 0);
      m3.add(new THREE.LineSegments(new THREE.EdgesGeometry(b3), lineMaterial));
      
      group.add(m1, m2, m3);
      
      const baseGeom = new THREE.BoxGeometry(2.2, 0.2, 1);
      const baseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.position.y = -0.1;
      base.add(new THREE.LineSegments(new THREE.EdgesGeometry(baseGeom), lineMaterial));
      group.add(base);
      
      return group;
    };

    const objectCreators = [createLaptop, createMicrochip, createDatabase, createBarChart];
    const objects = [];

    // Spawning 15 custom tech objects around the screen
    for (let i = 0; i < 15; i++) {
      const creator = objectCreators[Math.floor(Math.random() * objectCreators.length)];
      const group = creator();
      
      // Random position spread across the screen
      group.position.x = (Math.random() - 0.5) * 35;
      group.position.y = (Math.random() - 0.5) * 25;
      group.position.z = (Math.random() - 0.5) * 20 - 15;

      group.rotation.x = Math.random() * Math.PI;
      group.rotation.y = Math.random() * Math.PI;

      // Custom animation variables
      group.userData = {
        rotationSpeedX: (Math.random() - 0.5) * 0.02,
        rotationSpeedY: (Math.random() - 0.5) * 0.02,
        floatSpeed: Math.random() * 0.02 + 0.01,
        startY: group.position.y,
        offset: Math.random() * Math.PI * 2
      };

      scene.add(group);
      objects.push(group);
    }

    camera.position.z = 8;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (e) => {
        mouseX = (e.clientX - windowHalfX);
        mouseY = (e.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animationId;

    function animate() {
        targetX = mouseX * 0.002;
        targetY = mouseY * 0.002;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        const time = clock.getElapsedTime();
        
        objects.forEach((obj) => {
            obj.position.y = obj.userData.startY + Math.sin(time * obj.userData.floatSpeed + obj.userData.offset) * 2;
            obj.rotation.x += obj.userData.rotationSpeedX;
            obj.rotation.y += obj.userData.rotationSpeedY;
        });

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    }

    animate();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default ThreeBackground;
