// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// Active Nav Link Update & Navbar Background on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

lenis.on('scroll', (e) => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-target") === current) {
            link.classList.add("active");
        }
    });

    // Add solid background to navbar when scrolled to prevent text merging with the blue globe
    if (pageYOffset > 50) {
        navbar.classList.add("bg-signal-yellow");
        navbar.classList.add("shadow-[0_4px_0_#333333]");
    } else {
        navbar.classList.remove("bg-signal-yellow");
        navbar.classList.remove("shadow-[0_4px_0_#333333]");
    }
    
    // Fade out scroll indicator
    const scrollIndicator = document.getElementById("scroll-indicator");
    if (scrollIndicator) {
        if (pageYOffset > 50) {
            scrollIndicator.style.opacity = "0";
        } else {
            scrollIndicator.style.opacity = "1";
        }
    }
});

// Fade in and slide up for elements with .fade-up
gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Trigger when top of element hits 85% of viewport
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Staggered animations for cards
gsap.utils.toArray('.stagger-container').forEach((container) => {
    const items = container.querySelectorAll('.stagger-item');
    gsap.from(items, {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });
});

// Smooth scroll to anchor
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
        lenis.scrollTo(targetSection);
    });
});

// Vanilla Tilt initialization
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: false,
    "max-glare": 0,
    scale: 1.02
});

// Parallax Effects with GSAP
// The globe intro section scales up playfully
gsap.from(".globe-surface", {
    scrollTrigger: {
        trigger: "#intro",
        start: "top 80%",
        end: "top 30%",
        scrub: true
    },
    scale: 0.5,
    opacity: 0,
    ease: "back.out(1.5)"
});

gsap.utils.toArray('.parallax-cloud').forEach((cloud, i) => {
    gsap.to(cloud, {
        yPercent: -100 + (i * 20),
        xPercent: (i % 2 === 0 ? 50 : -50),
        ease: "none",
        scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// Arc text is now handled by SVG in HTML

// Three.js Background Implementation (Pop-up Book Diorama)
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();
scene.background = null; // Transparent to show body bg

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Flat Colors matching DESIGN.md + a special green for grass
const colors = {
    yellow: 0xffe600,
    blue: 0x007fff,
    coral: 0xef3b2c,
    dark: 0x333333,
    white: 0xffffff,
    green: 0x00c853 // Grass Green
};

// Create abstract geometric houses (Pop-up style)
const objects = [];

function createHouse(x, y, z, color) {
    const group = new THREE.Group();
    
    // Base
    const geometry = new THREE.BoxGeometry(1, 1.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: colors.white });
    const box = new THREE.Mesh(geometry, material);
    
    // Outline (LineSegments) for that hand-drawn feel
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: colors.dark, linewidth: 2 });
    const boxLines = new THREE.LineSegments(edges, lineMaterial);
    box.add(boxLines);
    group.add(box);
    
    // Roof
    const roofGeom = new THREE.ConeGeometry(0.8, 1, 4);
    const roofMat = new THREE.MeshBasicMaterial({ color: color });
    const roof = new THREE.Mesh(roofGeom, roofMat);
    roof.position.y = 1.25;
    roof.rotation.y = Math.PI / 4;
    
    const roofEdges = new THREE.EdgesGeometry(roofGeom);
    const roofLines = new THREE.LineSegments(roofEdges, lineMaterial);
    roof.add(roofLines);
    
    group.add(roof);
    
    group.position.set(x, y, z);
    scene.add(group);
    objects.push(group);
    return group;
}

// Place some houses around
createHouse(-4, -1, -5, colors.coral);
createHouse(4, -0.5, -6, colors.blue);
createHouse(-6, 1, -8, colors.dark);
createHouse(3, 2, -10, colors.coral);
createHouse(6, -2, -4, colors.dark);

// Create Cartoon Clouds for background animation
const clouds = [];
function createCloud(x, y, z, scale) {
    const group = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ color: colors.white });
    const lineMaterial = new THREE.LineBasicMaterial({ color: colors.dark, linewidth: 2 });
    
    // Create multiple overlapping spheres to form a puffy cloud
    const positions = [
        [0, 0, 0], [0.8, 0.2, 0], [-0.8, 0.1, 0], 
        [0.4, 0.6, 0], [-0.4, 0.5, 0]
    ];
    
    positions.forEach(pos => {
        const geom = new THREE.SphereGeometry(0.6, 8, 8); // low poly flat shading style
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.set(pos[0], pos[1], pos[2]);
        
        const edges = new THREE.EdgesGeometry(geom);
        const lines = new THREE.LineSegments(edges, lineMaterial);
        mesh.add(lines);
        
        group.add(mesh);
    });
    
    group.position.set(x, y, z);
    group.scale.set(scale, scale, scale);
    scene.add(group);
    clouds.push(group);
}

// Add clouds scattered in the background
for(let i = 0; i < 12; i++) {
    createCloud(
        (Math.random() - 0.5) * 40, 
        2 + Math.random() * 10, 
        -8 - Math.random() * 15,
        0.5 + Math.random() * 2
    );
}

// Create Trees & Grass
function createTree(x, y, z, scale) {
    const group = new THREE.Group();
    const leafMat = new THREE.MeshBasicMaterial({ color: colors.green });
    const trunkMat = new THREE.MeshBasicMaterial({ color: colors.dark });
    const lineMat = new THREE.LineBasicMaterial({ color: colors.dark, linewidth: 2 });
    
    // Trunk
    const trunkGeom = new THREE.CylinderGeometry(0.2, 0.3, 1, 6);
    const trunk = new THREE.Mesh(trunkGeom, trunkMat);
    trunk.position.y = 0.5;
    group.add(trunk);
    
    // Leaves (Cone)
    const leafGeom = new THREE.ConeGeometry(1, 2, 6);
    const leaf = new THREE.Mesh(leafGeom, leafMat);
    leaf.position.y = 2;
    leaf.add(new THREE.LineSegments(new THREE.EdgesGeometry(leafGeom), lineMat));
    group.add(leaf);
    
    group.position.set(x, y, z);
    group.scale.set(scale, scale, scale);
    scene.add(group);
}

function createGrass(x, y, z) {
    const geom = new THREE.ConeGeometry(0.1, 0.4, 3);
    const mat = new THREE.MeshBasicMaterial({ color: colors.green });
    const grass = new THREE.Mesh(geom, mat);
    grass.position.set(x, y, z);
    grass.rotation.x = (Math.random() - 0.5) * 0.4;
    grass.rotation.z = (Math.random() - 0.5) * 0.4;
    scene.add(grass);
}

// Scatter trees and grass on the ground level
for(let i = 0; i < 10; i++) {
    createTree(
        (Math.random() - 0.5) * 30, 
        -3, 
        -5 - Math.random() * 15,
        0.8 + Math.random() * 0.5
    );
}
for(let i = 0; i < 40; i++) {
    createGrass(
        (Math.random() - 0.5) * 40, 
        -2.5, 
        -4 - Math.random() * 16
    );
}

// Create Cartoon Airplanes
const airplanes = [];
function createAirplane(x, y, z, color) {
    const group = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ color: color });
    const lineMaterial = new THREE.LineBasicMaterial({ color: colors.dark, linewidth: 2 });
    
    // Fuselage
    const bodyGeom = new THREE.BoxGeometry(2, 0.8, 0.8);
    const body = new THREE.Mesh(bodyGeom, material);
    body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeom), lineMaterial));
    group.add(body);
    
    // Wings
    const wingGeom = new THREE.BoxGeometry(0.8, 0.2, 3);
    const wing = new THREE.Mesh(wingGeom, material);
    wing.position.set(0.2, 0.1, 0);
    wing.add(new THREE.LineSegments(new THREE.EdgesGeometry(wingGeom), lineMaterial));
    group.add(wing);
    
    // Tail
    const tailGeom = new THREE.BoxGeometry(0.5, 0.8, 0.2);
    const tail = new THREE.Mesh(tailGeom, material);
    tail.position.set(-0.8, 0.6, 0);
    tail.add(new THREE.LineSegments(new THREE.EdgesGeometry(tailGeom), lineMaterial));
    group.add(tail);

    // Propeller
    const propGeom = new THREE.BoxGeometry(0.1, 1.2, 0.2);
    const propMaterial = new THREE.MeshBasicMaterial({ color: colors.dark });
    const prop = new THREE.Mesh(propGeom, propMaterial);
    prop.position.set(1.05, 0, 0);
    group.add(prop);
    
    group.userData.propeller = prop;
    
    group.position.set(x, y, z);
    scene.add(group);
    airplanes.push(group);
}

createAirplane(-15, 6, -12, colors.coral);
createAirplane(15, 8, -15, colors.blue);

camera.position.z = 5;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
});

// Scroll Interaction for 3D elements
let scrollY = 0;
lenis.on('scroll', (e) => {
    scrollY = e.scroll;
});



// Animation Loop
const clock = new THREE.Clock();

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    // Smooth camera movement based on mouse
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    const time = clock.getElapsedTime();
    
    // Floating animation for the houses (removed scroll-based rotation)
    objects.forEach((obj, i) => {
        // Pop-up float
        obj.position.y = obj.userData.startY || obj.position.y;
        if (!obj.userData.startY) obj.userData.startY = obj.position.y;
        
        obj.position.y = obj.userData.startY + Math.sin(time * 2 + i) * 0.2;
    });

    // Cloud background animation (drifting slowly)
    clouds.forEach((cloud, i) => {
        cloud.position.x += 0.01 * (1 + i * 0.1);
        if(cloud.position.x > 20) {
            cloud.position.x = -20; // loop back
        }
        cloud.position.y += Math.sin(time + i) * 0.005; // gentle bobbing
    });

    // Airplane animation
    airplanes.forEach((plane, i) => {
        // Fly across
        plane.position.x += (i === 0 ? 0.08 : -0.05); 
        
        if (i === 0) {
            plane.rotation.y = 0; 
            if (plane.position.x > 25) plane.position.x = -25;
        } else {
            plane.rotation.y = Math.PI; 
            if (plane.position.x < -25) plane.position.x = 25;
        }

        plane.position.y += Math.cos(time * 2 + i) * 0.02;
        plane.userData.propeller.rotation.x += 0.5;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Re-calculate arc text on resize if needed (simple reload or re-init here)
});

// Surprise Button Logic using DOM elements so it floats OVER the blue globe
const btnSurprise = document.getElementById('btn-surprise');

if (btnSurprise) {
    btnSurprise.addEventListener('click', () => {
        const burstColors = ['#ffe600', '#ef3b2c', '#007fff', '#ffffff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 15 + 10;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = burstColors[Math.floor(Math.random() * burstColors.length)];
            confetti.style.position = 'fixed';
            confetti.style.border = '2px solid #333333';
            confetti.style.zIndex = '9999';
            
            // Start at the button position
            const rect = btnSurprise.getBoundingClientRect();
            confetti.style.left = `${rect.left + rect.width / 2}px`;
            confetti.style.top = `${rect.top + rect.height / 2}px`;
            
            document.body.appendChild(confetti);
            
            // Animate with GSAP
            gsap.to(confetti, {
                x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                y: window.innerHeight + 100,
                rotation: Math.random() * 720 - 360,
                duration: 2 + Math.random() * 2,
                ease: "power1.in",
                onComplete: () => {
                    confetti.remove();
                }
            });
        }
    });
}
