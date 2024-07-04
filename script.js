import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Scene
const scene = new THREE.Scene();

//Load Model
const loader = new GLTFLoader();
let gWagon;
loader.load('./brabus_g900_rocket_edition/scene.gltf', function (gltf) {
    gWagon = gltf.scene;
    gWagon.rotation.y = -0.8;
    scene.add(gWagon);
    modelInstantiated();

}, undefined, function (error) {

    console.error(error);

});

//Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 8, 8);
scene.add(light);
const lightTwo = new THREE.PointLight(0xffffff, 100, 100);
lightTwo.position.set(8, 8, 8);
scene.add(lightTwo);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(-1.5, 1, 5);
scene.add(camera);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Loops and event listeners
window.addEventListener('resize', () => {
    console.log('resize');
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
})

const mouseFollower = document.querySelector('#mouse-follow');
document.body.addEventListener('mousemove', (e) => {
    mouseFollower.style.left = e.clientX + 'px';
    mouseFollower.style.top = e.clientY + 'px';
})

const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();

//GSAP
const modelInstantiated = () => {
    gsap.registerPlugin(ScrollTrigger)

    let gWagon_HeroIntoFeaturesTL = gsap.timeline({
        defaults: {
            ease: "none"
        },
        scrollTrigger: {
            trigger: '#hero',
            scrub: 1,
            start: 'top top',
            end: 'center top'
        }
    });

    gWagon_HeroIntoFeaturesTL
        .to(gWagon.rotation, {
            y: Math.PI,
            x: Math.PI / 2
        })
        .to(gWagon.position, {
            x: '-1.5'
        }, '<')
        .to(camera.position, {
            z: 10 
        }, '<')
}

//Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)