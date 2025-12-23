import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ThreeService {
    private scene: THREE.Scene | null = null;
    private camera: THREE.PerspectiveCamera | null = null;
    private renderer: THREE.WebGLRenderer | null = null;
    private particles: THREE.Points | null = null;
    private geometries: THREE.Mesh[] = [];
    private animationId: number | null = null;
    private mouse = { x: 0, y: 0 };

    constructor(private ngZone: NgZone) { }

    /**
     * Initialize Three.js scene with particle system and floating geometries
     */
    initScene(container: HTMLElement): void {
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Create particle system
        this.createParticleSystem();

        // Create floating geometries
        this.createFloatingGeometries();

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(container));
    }

    /**
     * Create particle system with 5000+ particles
     */
    private createParticleSystem(): void {
        if (!this.scene) return;

        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        // Create particles with random positions
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            // Color (purple to cyan gradient)
            const color = new THREE.Color();
            color.setHSL(
                Math.random() * 0.2 + 0.6, // Hue: purple to cyan
                0.8,
                0.6
            );
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    /**
     * Create floating geometric shapes
     */
    private createFloatingGeometries(): void {
        if (!this.scene) return;

        // Icosahedron
        const icoGeometry = new THREE.IcosahedronGeometry(5, 0);
        const icoMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });
        const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
        icosahedron.position.set(-20, 10, -10);
        this.geometries.push(icosahedron);
        this.scene.add(icosahedron);

        // Torus
        const torusGeometry = new THREE.TorusGeometry(4, 1.5, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(20, -10, -15);
        this.geometries.push(torus);
        this.scene.add(torus);

        // Octahedron
        const octaGeometry = new THREE.OctahedronGeometry(4, 0);
        const octaMaterial = new THREE.MeshPhongMaterial({
            color: 0xa78bfa,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });
        const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
        octahedron.position.set(0, -15, -20);
        this.geometries.push(octahedron);
        this.scene.add(octahedron);
    }

    /**
     * Animation loop (60 FPS optimized)
     */
    private animate = (): void => {
        // Run outside Angular zone for better performance
        this.ngZone.runOutsideAngular(() => {
            this.animationId = requestAnimationFrame(this.animate);

            if (!this.scene || !this.camera || !this.renderer) return;

            // Rotate particles
            if (this.particles) {
                this.particles.rotation.y += 0.0005;
                this.particles.rotation.x += 0.0003;
            }

            // Rotate geometries
            this.geometries.forEach((geometry, index) => {
                geometry.rotation.x += 0.001 * (index + 1);
                geometry.rotation.y += 0.002 * (index + 1);

                // Float animation
                geometry.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });

            // Mouse parallax effect
            if (this.camera) {
                this.camera.position.x += (this.mouse.x * 5 - this.camera.position.x) * 0.05;
                this.camera.position.y += (-this.mouse.y * 5 - this.camera.position.y) * 0.05;
                this.camera.lookAt(this.scene.position);
            }

            this.renderer.render(this.scene, this.camera);
        });
    };

    /**
     * Add mouse interaction for parallax effect
     */
    addMouseInteraction(): void {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
        });
    }

    /**
     * Handle window resize
     */
    private onWindowResize(container: HTMLElement): void {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    /**
     * Clean up Three.js resources
     */
    dispose(): void {
        // Cancel animation loop
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }

        // Dispose geometries
        this.geometries.forEach(mesh => {
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });

        // Dispose particles
        if (this.particles) {
            this.particles.geometry.dispose();
            if (this.particles.material instanceof THREE.Material) {
                this.particles.material.dispose();
            }
        }

        // Dispose renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }

        // Clear references
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometries = [];
    }
}
